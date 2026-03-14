const url = "http://localhost:11434/api/generate";

const setupContainer = document.getElementById('setup-container');
const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');
const outputContainer = document.getElementById('output-container');

const outputTitle = document.getElementById('output-title');
const outputDesc = document.getElementById('output-desc');
const outputSong = document.getElementById('output-song');
const outputList = document.getElementById('output-list');

const urls = 'http://localhost:11434/api/generate'  // Note: Ollama doesn't generate images; using text description instead
const outputImg = document.getElementById('output-img-container');
const returnButton = document.getElementById('return-btn');

document.getElementById('submit-btn').addEventListener("click", () => {
  const theme = document.getElementById("theme").value;
  const numOfSongs = document.getElementById("num-of-songs").value;
  const token = document.getElementById("userID").value;
  fetchBotReply(theme, numOfSongs, token);

});

async function fetchBotReply(theme, numOfSongs, token) {
  try {
    //const promptText = setupTextarea.value;
    setupInputContainer.innerHTML = `<div class="loader" style="border: 16px solid rgb(200, 150, 0); border-top: 16px solid rgb(200, 0, 100);
    border-radius: 50%; width: 120px; height: 120px; animation: spin 2s linear infinite; text-align: center; align-items: center"></div>`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'model': 'llama2',  // Change to your preferred Ollama model, e.g., 'mistral'
        'prompt': `Tell me my prompt is a good theme in 10 words.`,
        'stream': false
      })
    });

    const data = await response.json();
    const botReply = data.response.trim();
    console.log(botReply);

    movieBossText.innerText = botReply;
    fetchSongList(theme, numOfSongs, token);

  } catch (error) {
    console.error('Error:', error);
    movieBossText.innerText = 'Oops! I was unable to understand the prompt!'
  }
}

async function fetchSongList(theme, numOfSongs, token) {
  try {
    const response = await fetch(url, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'model': 'llama2',  // Change to your preferred Ollama model
        'prompt': `Use the given theme and genre of music to create a playlist with the given number of songs.
        
        ###

        theme : A pop music playlist perfect for a drive with friends, featuring upbeat and feel-good tracks that make everyone want to sing along.
        number of songs: 6

        response : {
          "name" : "Wanna go for a drive?",
          "image" : "An aerial shot of a winding coastal highway at sunset, with a car driving along the road. The sky is a mix of orange, pink, and purple hues, reflecting on the ocean waves. The overall vibe is adventurous and free-spirited, perfectly capturing the essence of a fun drive with friends.",
          "songs_list" : {
              "1":"Violet by Conner Price (ft. Killa)",
              "2":"OMG by Camila Cabello (ft. Quavo)",
              "3":"Demons by Imagine Dragons",
              "4":"Insane by Black GryphOn (ft. Baasik)"
              "5":"No Tomorrow by Ty Frankel (ft. Stephane Lo Jacomo, Myariah Summers)",
              "6":"JADED by Fordo"          
            }
        }    

        ###

        theme: Create a progressive death metal playlist that really captures the essence of the genre. Think complex rhythms, brutal riffs, and those atmospheric interludes that make the music so intense and immersive. This one's for the fans who love technical skill and raw power in their metal.
        number of songs: 10

        response:
        {
            "name": "Evolving Abyss",
            "image": "A dark, stormy ocean with waves crashing against jagged rocks under a blood-red sky. In the foreground, a ghostly figure emerges from the water, shrouded in mist, with intricate, glowing runes etched into its skin.",
            "songs_list": {
                "1": "Ghost of Perdition by Opeth",
                "2": "Flying Whales by Gojira",
                "3": "Symbolic by Death",
                "4": "Crimson by Edge of Sanity",
                "5": "And Plague Flowers the Kaleidoscope by Ne Obliviscaris",
                "6": "Abeyance by Be'lakor",
                "7": "The Silent Life by Rivers of Nihil",
                "8": "Selkies: The Endless Obsession by Between the Buried and Me",
                "9": "The Void Alone by Fallujah",
                "10": "The Divinity of Oceans by Ahab"
            }
        }
        
        ###

        theme: mellow acoustic playlist to relax and unwind, with soothing guitar melodies and gentle vocals that create a peaceful atmosphere
        number of songs: 5

        response: {
            "name": "Serene Strings",
            "image": "A tranquil forest clearing at twilight, with golden fireflies dancing in the air and a serene river flowing nearby. The sky is a deep blue with a pinkish tinge with stars beginning to appear, creating a calming and peaceful ambiance.",
            "songs_list": {
                "1": "Banana Pancakes by Jack Johnson",
                "2": "Skinny Love by Bon Iver",
                "3": "The A Team by Ed Sheeran",
                "4": "Let Her Go by Passenger",
                "5": "Fast Car by Tracy Chapman"
            }
        }

        ###

        theme: energetic Bollywood dance playlist to get everyone moving and grooving at a party, filled with high-energy beats and catchy tunes
        number of songs: 8

        response: {
            "name": "Dance to the Desi Rhythm",
            "image": "A vibrant party scene with colorful lights, people dancing in traditional and modern attire, and a DJ in the background. The atmosphere is lively and festive, capturing the excitement of a Bollywood dance party.",
            "songs_list": {
                "1": "Gallan Goodiyan by various artists",
                "2": "Kala Chashma by Badshah, Neha Kakkar",
                "3": "Badtameez Dil by Benny Dayal, Sunidhi Chauhan",
                "4": "Kar Gayi Chull by Badshah, Neha Kakkar, and Fazilpuria",
                "5": "London Thumakda by Neha Kakkar, Sonu Kakkar, and Labh Janjua",
                "6": "Ghungroo by Arijit Singh, Shreya Ghoshal",
                "7": "Makhna by Yo Yo Honey Singh, Neha Kakkar",
                "8": "Nachde Ne Saare by Jasleen Royal, Harshdeep Kaur"
            }
        }

        ###
        
        theme: ${theme}
        number of songs: ${numOfSongs}

        response: `,
        
        'stream': false
      })
    });

    const data = await response.json();
    const botReply = data.response.trim();
    console.log(botReply);
    const botReplyJSON = JSON.parse(botReply);
    console.log(botReplyJSON+"\nafterparse");
    const songNames = Object.values(botReplyJSON["songs_list"]);
    console.log(songNames);

    const img_desc = botReplyJSON["image"].split(".")[0];
    const playlist_name = botReplyJSON["name"];
    let songs = [];
    for(const key_no in botReplyJSON["songs_list"]) {
        songs.push(botReplyJSON["songs_list"][key_no]);
    }
    console.log(img_desc);
    console.log(songs);
    console.log(theme);
    console.log(playlist_name);
    const prompt = img_desc;
    setupContainer.style.display = 'none';

    let song_names = "";
    for(let i = 0; i < songs.length; i++)
    {
        song_names = song_names + (i + 1) + ". " + songs[i] + "\n";
    }
    
    outputContainer.style.display = 'block';
    outputTitle.innerText = playlist_name;
    outputDesc.innerText = "(" + theme + ")";
    outputSong.innerText = "Songs:";
    outputList.innerText = song_names;
    
    await generateImage(prompt);

    document.getElementById('create-btn').addEventListener("click", () => {
      document.getElementById('spotify-embed').style.display = 'block';
      outputContainer.style.display = 'none';
      // setupContainer.style.display = 'block';
      // setupInputContainer.innerHTML = `<label>Spotify User ID</label>
      //         <input type="text" style="text-align: center;" id="userID">
      //         <p></p>
      //         <label>Theme</label>
      //         <input type="text" style="text-align: center;" id="theme">
      //         <p></p>
      //         <label>Number of songs</label>
      //         <input type="number" min="1" max="10" style="text-align: center;" id="num-of-songs">
      //         <p></p>
              
      //         <button class="submit-btn" id="submit-btn" aria-label="send">
      //             <img src="images/submit-img.png" alt="send" width="150px" height="40px">
      //         </button>`;
      createSpotifyPlaylist(playlist_name, theme, songNames, token);
    });

  } catch (error) {
    console.error('Error:', error);
    movieBossText.innerText = 'Oh no! I was unable to generate the list of songs!'
}
}

function generateImage(prompt) {
    // Since Ollama doesn't generate images, display the text description instead
    outputImg.innerHTML = `<p style="color: white; font-style: italic;">Album Art Description: ${prompt}</p>`;
}

async function fetchWebApi(endpoint, method, token, body = null) {
  try {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method,
      body: body ? JSON.stringify(body) : null
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getTracksByNames(names, token) {
  const tracks = [];
  for (const name of names) {
    const data = await fetchWebApi(`v1/search?q=${encodeURIComponent(name)}&type=track&limit=1`, 'GET', token);
    if (data && data.tracks && data.tracks.items.length > 0) {
      tracks.push(data.tracks.items[0]);
    }
  }
  return tracks;
}

async function createPlaylist(tracksUri, album_name, theme, token) {
  const user = await fetchWebApi('v1/me', 'GET', token);
  const user_id = user.id;

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', token, {
      "name": album_name,
      "description": theme,
      "public": false
  });

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST', token
  );

  return playlist;
}

async function createSpotifyPlaylist(album_name, theme, songNames, token) {
  const tracks = await getTracksByNames(songNames, token);
  const trackUris = tracks.map(track => `spotify:track:${track.id}`);
  const createdPlaylist = await createPlaylist(trackUris, album_name, theme, token);

  const playlistId = createdPlaylist.id;
  const iframe = document.createElement('iframe');
  iframe.title = "Spotify Embed: Custom Theme Playlist";
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.minHeight = '360px';
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";

  document.getElementById('spotify-embed').appendChild(iframe);
}