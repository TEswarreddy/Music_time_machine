from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://music-time-machine.netlify.app/"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Model
class PlaylistRequest(BaseModel):
    CLIENT_ID: str
    CLIENT_SECRET: str
    date: str  # Format: YYYY-MM-DD

@app.post("/create-playlist")
def create_playlist(data: PlaylistRequest):
    print(data)
    #return {"message": "Playlist Created!"}
    sp = spotipy.Spotify(
        auth_manager=SpotifyOAuth(
        scope="playlist-modify-private",
        redirect_uri="http://localhost:1234",
        client_id="c7fa9d72a40747d9a0557451f43e80a0",
        client_secret="ccf184967bbd4f4eb0e640f74eb318fb",
        show_dialog=True,
        cache_path="token.txt",
        )
    )
    user_id = sp.current_user()["id"]
    print(f"user ID: {user_id}")

    # ✅ Get Billboard Data
    date = data.date
    header = {"User-Agent": "Mozilla/5.0"}
    URL = f"https://www.billboard.com/charts/hot-100/{date}"
    response = requests.get(url=URL, headers=header)
    soup = BeautifulSoup(response.text, "html.parser")
    song_names_title = soup.select("li ul li h3")
    song_names = [song.getText().strip() for song in song_names_title]

    print(f"🎵 Retrieved {len(song_names)} songs from Billboard.")
    # ✅ Search for Songs on Spotify
    song_uris = []
    year = date.split("-")[0]

    for song in song_names:
        result = sp.search(q=f"track:{song} year:{year}", type="track", limit=1)
        if result["tracks"]["items"]:
            uri = result["tracks"]["items"][0]["uri"]
            song_uris.append(uri)
        else:
            print(f"⚠️ {song} not found on Spotify. Skipping...")

    # ✅ Ensure We Have Songs Before Continuing
    if not song_uris:
        print("❌ No songs were found. Check your Billboard scraping or Spotify search.")
        exit()

    # ✅ Create Playlist
    playlist = sp.user_playlist_create(user=user_id, name=f"{date} Billboard 100", public=False)
    print(f"📃 Playlist created: {playlist['id']}")

    # ✅ Add Songs to Playlist
    sp.playlist_add_items(playlist_id=playlist["id"], items=song_uris)
    return ("✅ Songs added to playlist successfully!")
