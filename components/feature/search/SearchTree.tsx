import { useEffect, useState } from 'react';
import _ from 'lodash';

interface SearchRowProps {
    document?: any;
    setChecedkData?: any;
    // checked: boolean;
    setDocument?: any;
    tree?: any;
}

const trees = [
    {
        subtree_title: 'DocAI - Roy Ho',
        children: [
            {
                id: 'be88691a-aee8-4e88-a114-aadc2785be86',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/d6e77a24-8e78-4cc9-a658-07a56b8ed5a5_docai - roy ho.pdf',
                name: 'DocAI - Roy Ho.pdf'
            },
            {
                id: '1f66ee2f-6435-4ddb-8457-f1c430b361ff',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/068ca2e7-b457-4061-897a-cf14bdcadcb7_docai - roy ho.jpg',
                name: 'DocAI - Roy Ho.jpg'
            },
            {
                id: 'c27b30ed-a690-4c66-8696-de2fb1cb1733',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/04a34a49-9a1f-4397-baf6-378772cecd66_58f9ce92faa44a24f59122cacf3a87f8.jpeg',
                name: '58f9ce92faa44a24f59122cacf3a87f8.jpeg'
            },
            {
                id: 'c55d1af7-46b2-4491-a47a-c2b336bb2db2',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/8b9b5e86-2881-4f9d-b811-b328717bd59a_wechatimg2626.jpeg',
                name: 'WechatIMG2626.jpeg'
            },
            {
                id: 'cdf066cf-8fbf-4b76-ab3a-2402d40e81d0',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/a0680e68-4f11-46a9-bd85-5ebea7f7e37e_docai - roy ho.pdf',
                name: 'DocAI - Roy Ho.pdf'
            }
        ]
    },
    {
        subtree_title: 'Alice Corporation - Kazuki Yamamoto',
        children: [
            {
                id: '015bbb46-0a70-44fb-b5da-fd6249be6f79',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/aa87022e-8038-41e2-9219-cf61e2e29943_kazuki yamamoto.jpg',
                name: 'Kazuki Yamamoto.jpg'
            }
        ]
    },
    {
        subtree_title: 'MJSSEYA - Bobby Lian',
        children: [
            {
                id: '912b9bbe-7f90-4bb4-8cac-9ed04ddd8237',
                storage_url:
                    'https://m2mda.blob.core.windows.net/chyb-document-storage/006462a6-b714-4147-bce7-7ffd9ca8fec6_image.jpg',
                name: 'image.jpg'
            }
        ]
    }
];

export default function SearchRow(props: SearchRowProps) {
    const { document, setChecedkData, setDocument, tree = [] } = props;

    const [visable, setVisable] = useState(false);
    const [checked, setCheck] = useState(false);

    const [hidden, setHidden] = useState([]);

    useEffect(() => {
        if (!checked) setVisable(false);
    }, [checked]);

    const onMouseEnter = () => {
        if (checked) return;
        setVisable(true);
    };
    const onMouseLeave = () => {
        if (checked) return;
        setVisable(false);
    };
    const check = (e: any) => {
        setChecedkData(e.target.checked, e.target.value);
        setDocument(document);
    };

    const ChildrenRow = (document: any) => {
        return (
            <div
                className={`group relative flex flex-col justify-start items-center p-4 rounded-md hover:bg-gray-100 ${
                    checked && 'bg-gray-100'
                }`}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                <input
                    type={'radio'}
                    value={document.id}
                    name="document"
                    className=" absolute top-2 right-2"
                    onChange={(e) => {
                        check(e);
                    }}
                />
                <div className="mt-2 flex justify-center items-center" id={document.id}>
                    <a href={document.storage_url} className="text-center">
                        <p className="relative text-gray-900 text-center text-sm border-b-2 border-gray-500">
                            {document.name}
                        </p>
                        {/* <p className="relative text-gray-400  text-center text-xs">
                            {document.created_at.split('T')[0]}
                        </p> */}
                    </a>
                </div>
                <div className="w-3/4 h-40 rounded-md overflow-hidden group-hover:opacity-75">
                    {document.storage_url?.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? (
                        <object
                            className="w-full h-full object-center object-contain"
                            type="application/pdf"
                            data={document.storage_url + '#toolbar=0'}
                        >
                            <img
                                src={
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                }
                                alt="PDF file icon"
                                className="w-full h-full object-contain object-center"
                            />
                        </object>
                    ) : (
                        <img
                            src={document.storage_url}
                            alt={document.name}
                            className="w-full h-full object-contain object-center"
                        />
                    )}
                </div>
            </div>
        );
    };

    const ifChildren = (document: any, deep: number) => {
        // 判断是否为最后一层
        if (document?.subtree_title) {
            // 存在title则还需要遍历child
            // console.log(deep, document?.subtree_title)
            return (
                <>
                    <div
                        className={
                            deep == 0
                                ? 'text-black font-bold text-l border-b-2 border-black'
                                : 'text-black border-b-2 border-black'
                        }
                    >
                        {document?.subtree_title}
                    </div>
                    <div
                        className={
                            document?.children &&
                            document.children.length > 0 &&
                            document.children[0]?.subtree_title
                                ? 'flex flex-col'
                                : 'flex flex-row'
                        }
                    >
                        {document?.children?.map((child: any) => ifChildren(child, deep + 1))}
                    </div>
                </>
            );
        } else {
            // 没有title，最后一层输出name
            return ChildrenRow(document);
        }
    };

    const MenuItem = ({ item, level, last, last_last }: any) => {
        const paddingLeft = level <= 2 ? 0 : (level - 1) * 0; // 根据层级计算缩进值
        if (item.children) {
            return (
                <li className={'menuItem mb-2'} style={{ paddingLeft }}>
                    {!last_last &&
                        level >= 3 &&
                        _.times(level - 2, function (index) {
                            return (
                                <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                                    |&nbsp;
                                </span>
                            );
                        })}
                    {!last && level !== 1 && (
                        <>
                            <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                                ├─
                            </span>
                        </>
                    )}
                    {last && (
                        <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                            └─
                        </span>
                    )}
                    {item.subtree_title}
                    <ul className={'submenu py-1 mt-2 font-bold text-neutral-900 leading-[2]'}>
                        {item.children.map((child: any, index: number) => (
                            <MenuItem
                                key={child.id}
                                item={child}
                                level={level + 1}
                                last={item.children.length - 1 == index}
                                last_last={last}
                            />
                        ))}
                    </ul>
                </li>
            );
        }
        return (
            <li
                className={'menu font-normal whitespace-nowrap text-ellipsis overflow-hidden w-32'}
                style={{ paddingLeft }}
            >
                {!last_last && last_last != undefined ? (
                    <>
                        {level >= 3 &&
                            _.times(level - 2, function (index) {
                                return (
                                    <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                                        |&nbsp;
                                    </span>
                                );
                            })}
                    </>
                ) : last_last != undefined ? (
                    <>
                        {level >= 3 &&
                            _.times(level - 2, function (index) {
                                return (
                                    <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                                        &nbsp;&nbsp;
                                    </span>
                                );
                            })}
                    </>
                ) : (
                    <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl"></span>
                )}

                {last ? (
                    <>
                        <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                            └─
                        </span>
                    </>
                ) : (
                    <>
                        <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                            ├─
                        </span>
                    </>
                )}
                <a href={'#'+item.id}>
                {item.name}
                </a>
            </li>
        );
    };

    const TreeNav = (document: any, deep: number) => {
        //判断是否为最后一层
        console.log(deep, document);
        if (document.subtree_title) {
            // 存在title则还需要遍历child
            if (deep === 0) {
                return (
                    <>
                        <div className="py-1 mt-2 font-bold text-neutral-900 leading-[2]">
                            {document?.subtree_title}
                        </div>
                        {document.children.map((child: any) => TreeNav(child, deep + 1))}
                    </>
                );
            } else {
                return (
                    <>
                        <div className="my-0.5 leading-[1.1]">
                            {navBefore(deep)}
                            {document?.subtree_title}
                        </div>
                        {document.children.map((child: any) => TreeNav(child, deep + 1))}
                    </>
                );
            }
        } else {
            return (
                <div>
                    {navBefore(deep)}
                    {document.name}
                </div>
            );
        }
    };

    const navBefore = (deep: number) => {
        if (deep == 1) {
            return (
                <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                    └─
                </span>
            );
        } else {
            // 大于1的情况
            return (
                <>
                    <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                        │&nbsp;
                    </span>
                    <span className="font-mono font-bold text-neutral-200 leading-[1.1] text-xl">
                        └─
                    </span>
                </>
            );
        }
    };

    return (
        <>
            <div className="flex scroll-smooth">
                <div className="text-sm bg-white shadow-md border-[1.5px] border-neutral-300 rounded-[2px] pr-2 py-2 max-w-64 pl-5 pt-2">
                    <ul className={'menu py-1 mt-2 font-bold text-neutral-900 leading-[2]'}>
                        {tree.map((item: any, index: number) => (
                            <MenuItem key={index} item={item} level={1} />
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col pl-0.5 sm:ml-5 px-1">
                    {tree.map((children: any, index: number) => {
                        // console.log(index + children.subtree_title)
                        return (
                            <div key={index} className="">
                                {ifChildren(children, 0)}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}