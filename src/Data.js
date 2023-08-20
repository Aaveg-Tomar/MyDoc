import React, { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import './css/data.css'
import { db } from './firebase';
import { auth } from './firebase';

function Data() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        db.collection("myfiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    useEffect(() => {
        if (auth.currentUser) {
            db.collection("myfiles")
                .where("userId", "==", auth.currentUser.uid)
                .onSnapshot((snapshot) => {
                    setFiles(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });
        } else {
            // User is not logged in, so clear the files
            setFiles([]);
        }
    }, []);



    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



    return (
        <div className='data'>
            <div className='data_header'>
                <div className='data_headerLeft'>
                    <p>My Doc</p>
                    <ArrowDropDownIcon />
                </div>

                <div className='data_headerRight'>
                    <FormatListBulletedIcon />
                    <InfoIcon />
                </div>
            </div>

            <div className='data_content'>
                <div className='data_grid'>
                    {
                        files.map((file) => {
                            return <div className='data_file'>
                                <InsertDriveFileIcon />
                                <p>
                                <a href={file.data.fileURL} target="_blank" rel="noopener noreferrer">
                                    {file.data.filename}
                                </a>
                                </p>
                            </div>
                        })
                    }
                </div>

                <div className='data_list'>
                    <div className='detailsRow'>
                        <p>Name <ArrowDownwardIcon /></p>
                        <p>Owner</p>
                        <p>Last modify</p>
                        <p>file size</p>
                    </div>
                    {
                        files.map((file) => {
                            return <div className='detailsRow'>
                                <p><InsertDriveFileIcon /> <a href={file.data.fileURL} target="_blank" rel="noopener noreferrer">
                                    {file.data.filename}
                                </a> </p>
                                <p>Me</p>
                                <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString().split(' ').slice(0, 4).join(' ')}
                                </p>
                                <p>{formatBytes(file.data.size)}</p>
                            </div>
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Data;
