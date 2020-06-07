import React, { useState, useEffect } from 'react';
import FileUploader from 'react-firebase-file-uploader';

import CircularProgress from '@material-ui/core/CircularProgress';

import { firebase } from '../../firebase';

const FileUploaderComponent = props => {
    const { defaultImgName, defaultImg, filename: propsFileName, dir, resetImage, tag } = props;

    const [FileUploaderState, setFileUploaderState] = useState({
        name: defaultImgName,
        isUploading: false,
        fileURL: defaultImg
    });

    useEffect(() => {
        setFileUploaderState({
            ...FileUploaderState,
            name: defaultImgName,
            fileURL: defaultImg
        })
    }, [FileUploaderState, defaultImg, defaultImgName])
    
    const { name, isUploading, fileURL } = FileUploaderState;
    const handleSetState = (newState) => setFileUploaderState({
        ...FileUploaderState,
        ...newState,
    })

   const handleUploadStart = () => {
    handleSetState({
            isUploading:true
        })
    };

    const handleUploadError = () => {
        handleSetState({
            isUploading: false,
        })
    }

    const handleUploadSuccess = async filename => {
        handleSetState({
            isUploading: false,
            name: filename,
        });
        propsFileName(filename);

        try {
            const url = await firebase.storage().ref(dir).child(filename).getDownloadURL();
            handleSetState({ fileURL: url });
        } catch (error) {
            console.log(error);
        }
    }

    const uploadAgain = () => {
        handleSetState({  
            name: '',
            isUploading: false,
            fileURL: ''
        });
        resetImage();
    }

    return (
        <>
            {!fileURL ?
                <>
                   <div className="label_inputs">{tag}</div> 

                   <FileUploader 
                    accept="image/*"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage().ref(dir)}
                    onUploadStart={ handleUploadStart }
                    onUploadError={ handleUploadError }
                    onUploadSuccess={ handleUploadSuccess }
                   />


                </>
                :null
            }
            { isUploading ?
                <div className="progress"
                    style={{textAlign:'center', margin:'30px 0'}}
                >
                    <CircularProgress
                        style={{color:'#98c6e9'}}
                        thickness={7}
                    />
                </div>    
            :null
            }
            { fileURL ?
                <div className="image_upload_container">
                    <img 
                        style={{
                            width:'100%'
                        }}
                        src={fileURL}
                        alt={name}
                    />
                    <div className="remove" onClick={ uploadAgain }>
                        Remove
                    </div>
                </div>  
            :null
            }
        </>
    );
}
export default FileUploaderComponent;
