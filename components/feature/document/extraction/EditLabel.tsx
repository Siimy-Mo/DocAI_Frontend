// components/feature/classification/AmendLabel.tsx
import { Dialog, Transition } from '@headlessui/react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import _ from 'lodash';
import React, { Fragment, useEffect, useRef, useState } from 'react';

interface EditLabelProps {
    open: boolean;
    setOpen: any;
    tag?: any;
    addNewLabelHandler?: any;
    updateLabelNameByIdHandler?: any;
}

export default function EditLabel(props: EditLabelProps) {
    const { open, setOpen, tag, addNewLabelHandler, updateLabelNameByIdHandler } = props;
    const cancelButtonRef = useRef(null);
    const inputRef = React.createRef<HTMLInputElement>();
    const [name, setName] = useState('');
    useEffect(() => {
        if (tag) {
            setName(tag.name);
        }
    }, [tag]);
    const confirmDocument = () => {
        setOpen(false);
        if (tag) {
            updateLabelNameByIdHandler(tag.id, name);
        } else {
            addNewLabelHandler();
        }
    };
    const isContain = (value: any) => {
        const index = _.findIndex(tag?.functions, function (func: any) {
            return func.id == value;
        });
        return index == -1;
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="w-full  mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                                    <div className="flex flex-row justify-center items-center">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <PencilSquareIcon
                                                className="h-6 w-6 text-sky-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium ml-2 text-gray-900"
                                        >
                                            {tag ? '編輯標籤' : '新增標籤'}
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full flex flex-row">
                                            <div className="w-1/4 flex justify-left items-center ">
                                                <label
                                                    htmlFor="new-type"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    名稱:
                                                </label>
                                            </div>
                                            <div className="flex w-3/4">
                                                <input
                                                    ref={inputRef}
                                                    id="type"
                                                    name="type"
                                                    type="string"
                                                    defaultValue={name}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={async (e) => {
                                                        setName(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        confirmDocument();
                                    }}
                                >
                                    確認
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
