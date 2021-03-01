import React, { useState, useEffect } from 'react';
import Dropdown from './componentes/Dropdown';
import Listbox from './componentes/Listbox';
import Detail from './componentes/Detail';
import { Credentials } from './componentes/Credentials';
import axios from 'axios';

const App = () => {

    const spotify = Credentials();
    console.log('RENDERING APP.JS');

    const data = [

        { Value: 1, name: 'A' },
        { Value: 2, name: 'B' },
        { Value: 3, name: 'C' }

    ];

    const [token, setToken] = useState('');
    const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
    const [tracks, setTracks] = useState({ SelectedTracks: '', listOfTracksFromAPI: [] });
    const [trackDetail, setTrackDetail] = useState(null);

    useEffect(() => {


        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
            .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);

                axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                })
                    .then(genreResponse => {
                        setGenres({
                            selectedGenre: genres.selectedGenre,
                            listOfGenresFromAPI: genreResponse.data.categories.items
                        })
                    });

            });


    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

    const genreChanged = val => {
        setGenres({
            selectedGenre: val,
            listOfGenresFromAPI: genres.listOfGenresFromAPI
        });

        axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(playlistResponse => {
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: playlistResponse.data.playlists.items
                })
            });

        console.log(val);
    }


    const playlistChanged = val => {
        console.log(val);
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        });
    }

    const buttonClicked = e => {
        e.preventDefault();

        axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

            .then(tracksResponse => {
                setTracks({

                    SelectedTracks: tracks.SelectedTracks,
                    listOfTracksFromAPI: tracksResponse.data.items
                })

            });
    }

    const listboxClicked = val => {

        const currentTracks = [...tracks.listOfTracksFromAPI];

        const trackInfo = currentTracks.filter(t => t.track.id === val);

        setTrackDetail(trackInfo[0].track);

    }

    return (

        <div className="container col-md-6">

            <form onSubmit={buttonClicked}>

                <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />

                <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />

                <div className="col-sm-12 row form-group px-0">
                    <button type='submit' className="btn btn-success col-sm-12" > Search </button>
                </div>

                <div className="Row" data-toggle="modal" data-target="#smallmodal">
                    <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
                </div>

                <div className="modal fade" id="smallmodal" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel"
                    aria-hidden="true">

                    <div className="modal-dialog modal-sm" role="document" >
                        <div className="modal-content" >
                            <div className="modal-header" ></div>
                            <div className="modal-body" > {
                                trackDetail && < Detail {...trackDetail}
                                />} </div> <div className="modal-footer" >
                                <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal" >
                                    return
                               </button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </div>


    );

}

export default App;