import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import MainAudioPlayer from '../AudioPlayer/MainAudio';
import DeleteSong from './DeleteSongAlert';
import DeleteSongModal from './DeleteSongModal';
import EditSongModal from './EditSongModal';
import "./song.css"


const SongDetail = ()=>{
    const dispatch = useDispatch()
    const {songId} = useParams()
    const song = useSelector(state => state.songs.song);
    const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);





    ;

    const [isLoaded, setIsLoaded] = useState(false)

    // console.log("song", song)
    // console.log('songObj', Object.values(song))

      useEffect(()=>{
        dispatch(songActions.getSongDetail(songId))
                .then(()=>{
                    setIsLoaded(true)
        })
      },[dispatch,songId,showModal])




      return isLoaded && (



                <div className='song-detail-entry' key={song.id}>
                    <div className='detail-image'>
                        <img className='cover-img'src={song.previewImage} />
                    </div>
                    <div className='detail-content'>
                        <h2 className='detial-title'>{song.title}</h2>
                        <h3 className='detail-text'>{song.Artist.username}</h3>
                    </div>
                    <div className='song-create-time'>
                    {(sessionUser?.id === song.userId) ? (
                        <>
                            <EditSongModal song={song} showModal={showModal} setShowModal={setShowModal}/>
                            <DeleteSongModal song={song} albumId={song.albumId} user={sessionUser}/>
                        </>
                    ):<></>}

                    </div>
                    <div className='song-detail-player'>
                        <MainAudioPlayer song={song}/>
                    </div>
                </div>



      )

}

export default SongDetail;
