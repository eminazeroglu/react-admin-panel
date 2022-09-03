import React, {useEffect, useRef, useState} from 'react';
import {useAppState} from "store/module/app.store";
import {translate} from "utils/helpers";

function UploadPhoto({
    height,
    imageClass,
    imageStyle,
    onChange,
    preview,
    format = ['image/jpeg', 'image/png', 'image/svg+xml']
}) {

    const photoRef = useRef();
    const {photos} = useAppState();
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const typeCheck = (type) => {
        return format.indexOf(type);
    }

    const handleUpload = (event) => {
        setError('')
        setLoading(false)
        const input = event.target;
        const info = input.files[0];
        if (input.files && input.files.length) {
            if (typeCheck(info.type) >= 0) {
                const reader = new FileReader();
                reader.onload = e => {
                    setPhoto(e.target.result);
                    setLoading(true)
                    if (onChange) onChange(e.target.result);
                }
                reader.readAsDataURL(input.files[0])
            }
            else {
                setError(translate('component.FileTypeError', {label: format.map(i => i.split('/')[1]).join(', ')}))
            }
        }
    }

    const handleRemove = () => {
        setLoading(false);
        setError('')
        setPhoto(photos?.default_photo);
        photoRef.current.value = '';
        if (onChange) onChange('');
    }

    useEffect(() => {
        setPhoto(preview || photos?.default_photo)
    }, [preview])

    return (
        <div className="form-photo">
            <figure className="form-photo__item !border-color">
                {loading && (
                    <button className="form-photo__item__close-button btn--action !p-0 btn btn--primary" onClick={e => handleRemove()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="feather feather-x"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18 6L6 18"/>
                            <path d="M6 6L18 18"/>
                        </svg>
                    </button>
                )}
                {photo && (
                    <img
                        src={photo}
                        alt=""
                        className={imageClass}
                        style={{...imageStyle, height: `${height}px`}}
                    />
                )}
                {error && (
                    <div className="form-photo__item__info">
                        <p className="form-photo__item__info__error">{error}</p>
                    </div>
                )}
            </figure>
            <div className="form-photo__buttons">
                <label className="btn btn--indigo btn--block">
                    <input type="file" ref={photoRef} onChange={handleUpload} accept={format}/>
                    {translate('button.SelectPhoto')}
                </label>
            </div>
        </div>
    );
}

export default UploadPhoto;
