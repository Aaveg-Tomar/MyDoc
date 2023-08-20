import React, { useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import './css/sidebar.css'
import { Modal } from '@mui/base';
import CloseIcon from '@mui/icons-material/Close';
import { db, storage } from './firebase';
import firebase from 'firebase';
import { auth } from './firebase';




function Sidebar() {
    const [open, setopen] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [file , setFile] = useState(null);


    const handleClose = () => {
        setopen(false);
    }

    const handleOpen = () => {
        setopen(true);
    }

    const handleChange = (e) =>{
        if(e.target.files[0])
        {
            setFile(e.target.files[0]);
        }
    }

    const handleUpload = (event) => {
        event.preventDefault();
        setuploading(true);
    
        if (auth.currentUser) {
            storage
                .ref(`files/${file.name}`)
                .put(file)
                .then((snapshot) => {
                    storage
                        .ref('files')
                        .child(file.name)
                        .getDownloadURL()
                        .then((url) => {
                            db.collection("myfiles").add({
                                userId: auth.currentUser.uid, // Store the user's uid
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                filename: file.name,
                                fileURL: url,
                                size: snapshot._delegate.bytesTransferred,
                            });
    
                            setuploading(false);
                            setFile(null);
                            setopen(false);
                        });
                });
        }
    };
    

    return (
        <>
            <Modal className='mod' open={open} onClose={handleClose} BackdropProps={{ onClick: handleClose }}>
                <div className='modal_pop'>
                    <form className='mo'>
                        <div className='modalHeading'>
                            <h3>Select file you want to upload</h3>
                            <button  onClick={handleClose}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className='modalBody'>
                            {
                                uploading ? (<p className='uploading'><img src='./spin.gif'/></p>) : (
                                    <>
                                        <input type='file' style={{margin:'20px'}} onChange={handleChange}/>
                                        <input type='submit' className='post_submit' onClick={handleUpload} />
                                    </>

                                )
                            }


                        </div>

                    </form>
                </div>

            </Modal>
            <div className='sidebar'>
                <div className='sidebar_btn'>
                    <button onClick={handleOpen}>
                        <AddIcon />
                        <span>New</span>
                    </button>
                </div>
                {/* <div className='sidebar_options'>

                    <div className='sidebar_option sidebar_option-Active'>
                        <PhoneAndroidIcon />
                        <span>My Doc</span>
                    </div>

                    <div className='sidebar_option'>
                        <ComputerIcon />
                        <span>Computer</span>
                    </div>

                    <div className='sidebar_option'>
                        <ShareIcon />
                        <span>Share</span>
                    </div>

                    <div className='sidebar_option'>
                        <AccessTimeIcon />
                        <span>Recent</span>
                    </div>

                    <div className='sidebar_option'>
                        <DeleteIcon />
                        <span>Trash</span>
                    </div>
                </div> */}
                <hr />

                {/* <div className='sidebar_options'>
                    <div className='sidebar_option'>
                        <CloudIcon />
                        <span>Storage</span>
                    </div>

                    <div className='progress_bar'>
                        <progress size='tiny' value="50" max="100" />
                        <span>6.54GB of 15 GB used</span>
                    </div>

                </div> */}
            </div>
        </>
    )
}

export default Sidebar;
