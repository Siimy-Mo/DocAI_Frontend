/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useRef } from 'react';
import useAlert from '../../../../hooks/useAlert';

export default function EditNewProjectModal(props: any) {
    const cancelButtonRef = useRef(null);
    const refTitle = useRef<HTMLInputElement>(null);
    const { setAlert } = useAlert();
    useEffect(() => {
        setTimeout(() => {
            if (refTitle.current) refTitle.current?.focus();
        }, 100);
    }, [props]);
    const validate = () => {
        if (!props?.filename) return setAlert({ title: '請輸入文檔名稱', type: 'info' });
        props.confirmClick(props?.filename);
    };

    return (
        <>
            <Transition.Root show={props.visable || false} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    onClose={() => {}}
                >
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center   shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="flex flex-row justify-between">
                                    <XMarkIcon
                                        className="w-6 cursor-pointer"
                                        onClick={props.cancelClick}
                                    />
                                    <label>{'填寫表格'}</label>
                                    <label>{''}</label>
                                </div>
                                <div className="w-full mt-4">
                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                <span className="text-red-500">*</span>文檔名稱:
                                            </label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input
                                                id="type"
                                                name="type"
                                                type="string"
                                                required={true}
                                                defaultValue={props?.filename}
                                                // autoFocus
                                                ref={refTitle}
                                                placeholder="文檔名稱"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={async (e) => {
                                                    props?.setFilename(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row m-2">
                                        <div className="w-1/4 flex justify-left items-center ">
                                            <label
                                                htmlFor="new-type"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                存放路徑:
                                            </label>
                                        </div>
                                        <div className="flex flex-1">
                                            <label className="flex flex-1">
                                                {props?.movingDest?.name || 'Root'}
                                            </label>
                                            <a
                                                className="cursor-pointer underline flex flex-0 text-blue-500"
                                                onClick={() => {
                                                    props.setMode('move');
                                                    props.cancelClick();
                                                }}
                                            >
                                                編輯
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                validate();
                                            }}
                                        >
                                            {props.confirmText || '確認'}
                                        </button>

                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => {
                                                props.cancelClick();
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            {props.cancelText || '取消'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
