import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Tooltip, Upload} from "antd";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
    serviceFileManagementPhotoRemove,
    serviceFileManagementPhotoRemoveAll,
    serviceFileManagementPhotoUpload
} from "services/file-management.service";
import {Modal} from "components/ui";
import {translate} from "utils/helpers";
import {FiPlus} from "@react-icons/all-files/fi/FiPlus";
import {FiTrash} from "@react-icons/all-files/fi/FiTrash";
import {useAppState} from "store/module/app.store";

const type = 'DragableUploadList';

const DragableUploadListItem = ({originNode, moveRow, file, fileList}) => {
    const ref = useRef(null);
    const index = fileList.indexOf(file);
    const [{isOver, dropClassName}, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const {index: dragIndex} = monitor.getItem() || {};

            if (dragIndex === index) {
                return {};
            }

            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: {
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    const errorNode = <Tooltip title="Upload Error">{originNode.props.children}</Tooltip>;
    return (
        <div
            ref={ref}
            className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
            style={{
                cursor: 'move',
            }}
        >
            {file.status === 'error' ? errorNode : originNode}
        </div>
    );
};

function FormMultiplePhoto({photos = [], onChange, path, error, thumbnail = {width: 150, height: 150}}) {
    const {errors} = useAppState();
    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState(false);
    const onChangePhoto = ({file, fileList}) => {
        if (file.type) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const form = {
                    url: e.target.result,
                    path: path || 'default',
                    thumbnail
                }
                const res = await serviceFileManagementPhotoUpload(form);
                if (res) {
                    setFileList(p => ([...p, res]));
                }
            }
            reader.readAsDataURL(file)
        }
    };

    const onPreview = async (file) => {
        let src = file.preview;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        setPreview({src, title: file.name})
    };

    const onRemove = async (file) => {
        try {
            await serviceFileManagementPhotoRemove({hash: file.hash})
            setFileList([...fileList.filter(i => i.uid !== file.uid)])
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleRemoveAll = async () => {
        const hash = fileList.map(i => i.hash);
        setFileList([]);
        await serviceFileManagementPhotoRemoveAll({hash})
    }

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = fileList[dragIndex];
            setFileList(
                update(fileList, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [fileList],
    );

    useEffect(() => {
        if (onChange)
            onChange(fileList.map(i => i.value));
    }, [fileList])

    useEffect(() => {
        setFileList(photos.length > 0 ? photos : [])
    }, photos)

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChangePhoto}
                    onPreview={onPreview}
                    onRemove={onRemove}
                    multiple={true}
                    accept={'.png,.jpeg,.jpg'}
                    itemRender={(originNode, file, currFileList) => (
                        <DragableUploadListItem
                            originNode={originNode}
                            file={file}
                            fileList={currFileList}
                            moveRow={moveRow}
                        />
                    )}
                >
                    <div className="flex flex-col space-y-2 items-center justify-center">
                        <span className="text-lg">
                            <FiPlus/>
                        </span>
                        <span>{translate('button.SelectPhotos')}</span>
                    </div>
                </Upload>
                {fileList.length > 0 && (
                    <div className="pt-3">
                        <button className="btn btn--red" type={'button'} onClick={() => handleRemoveAll()}>
                        <span className="mr-1">
                            <FiTrash/>
                        </span>
                            <span>
                            {translate('button.RemovePhotos')}
                        </span>
                        </button>
                    </div>
                )}
            </DndProvider>

            {(errors[error]) && (
                <div className="form-error" dangerouslySetInnerHTML={{__html: errors[error]}}/>
            )}

            <Modal
                visible={preview}
                onClose={() => setPreview(false)}
                title={preview?.title || ' '}
            >
                <div className="w-full h-full">
                    <img src={preview?.src} alt="" className="img-cover"/>
                </div>
            </Modal>
        </>
    );
}

export default FormMultiplePhoto;
