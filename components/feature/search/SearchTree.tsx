import { useEffect, useState } from 'react';

interface SearchRowProps {
    document?: any;
    setChecedkData?: any;
    // checked: boolean;
    setDocument?: any;
}


const tree = [
    {
        "children": [
            {
                "children": [
                    {
                        "id": "e14781a9-a7ad-4145-b692-d171cd4e9646",
                        "name": "ADM0209_陳兆佳.pdf",
                        "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/0cdd5076-a2b8-4301-abec-d17502fdf35b_adm0209_陳兆佳.pdf"
                    },
                    {
                        "id": "db1f3c89-a29c-43d1-a949-02cbfe30cc51",
                        "name": "472.pdf",
                        "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/7f8629ce-5ddf-48e8-8ac7-8d1d602bc7c8_472.pdf"
                    }
                ],
                "subtree_title": "Customer Service and Relations"
            },
            {
                "children": [
                    {
                        "id": "309bfcfc-de2b-45e7-9bd7-187f243b355a",
                        "name": "39.pdf",
                        "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/4ce11561-da73-4901-8641-e26bd00b86d3_39.pdf"
                    },
                    {
                        "id": "0b6f82cb-6ae9-4112-800f-69a88f1f7169",
                        "name": "39.pdf",
                        "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/271613e7-5a98-4bf1-8b04-becb6f6a662b_39.pdf"
                    }
                ],
                "subtree_title": "Technical and Engineering"
            }
        ],
        "subtree_title": "Professional Experience"
    },
    {
        "children": [
            {
                "id": "21f47cae-6c46-4dd2-bddf-a83f11357cd1",
                "name": "1800.pdf",
                "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/d52e9ef0-9a68-415c-9184-84789c63b24d_1800.pdf"
            }
        ],
        "subtree_title": "Security and Defense"
    },
    {
        "children": [
            {
                "id": "08914651-08b8-42c9-8ebe-56b642190d5d",
                "name": "CV_20230110.pdf",
                "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/3acf3fd1-0572-4782-9dd0-272aad30cdf7_2975.pdf"
            }
        ],
        "subtree_title": "IT and Systems Administration"
    },
    {
        "children": [
            {
                "id": "9a83467e-63f5-4a89-94ca-962fe298f9e3",
                "name": "1794.pdf",
                "storage_url": "https://m2mda.blob.core.windows.net/chyb-document-storage/c2cd9da9-5c03-4092-9d5e-ce436b4d8680_1794.pdf"
            }
        ],
        "subtree_title": "Sales and Marketing"
    }
]


export default function SearchRow(props: SearchRowProps) {
    const { document, setChecedkData, setDocument } = props;

    const [visable, setVisable] = useState(false);
    const [checked, setCheck] = useState(true);

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
                className={`group relative flex flex-col justify-start items-center p-4 rounded-md hover:bg-gray-100 ${checked && 'bg-gray-100'
                    }`}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}>
                <input
                    type={'radio'}
                    value={document.id}
                    name="document"
                    className=" absolute top-2 right-2"
                    onChange={(e) => {
                        check(e);
                    }}
                />
                <div className="mt-2 flex justify-center items-center">
                    <a href={document.storage_url} className="text-center">
                        <p className="relative text-gray-900 text-center text-sm border-b-2 border-gray-500">
                            {document.name}
                        </p>
                        {/* <p className="relative text-gray-400  text-center text-xs">
                            {document.created_at.split('T')[0]}
                        </p> */}
                    </a>
                </div>
                {/* <div className="w-3/4 h-60 rounded-md overflow-hidden group-hover:opacity-75">
                    {document.storage_url.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? (
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
                </div> */}
                
            </div>)
    }

    const ifChildren = (document: any, deep: number) => {    //判断是否为最后一层
        if (document.subtree_title) {   // 存在title则还需要遍历child
            // console.log(deep, node?.subtree_title)
            return (<>
                <div
                    className={
                        (deep == 0) ?
                            "text-black font-bold text-l border-b-2 border-black"
                            : "text-black border-b-2 border-black"}
                >
                    <span
                    className='font-mono font-bold text-neutral-200 leading-[1.1] text-xl'>
                        ├─
                    </span>
                    {document?.subtree_title}
                </div>
                <div
                    className={
                        (document.children[0].subtree_title) ?
                            'flex flex-col'
                            : 'flex flex-row'
                    }
                >
                    {document.children.map((child: any) => ifChildren(child, deep + 1))}
                </div>
            </>
            )
        } else {
            // console.log(deep, document.name)  //没有title，最后一层输出name  
            return ChildrenRow(document)
        }
    }


    return (
        <>
            <div>
                {/* <div className="mt-8 mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> */}

                {tree.map((children: any, index: number) => {
                    // console.log(index + children.subtree_title)
                    ifChildren(children, 0)
                    return (
                        <div
                            key={index}
                            className=''>
                            {ifChildren(children, 0)}
                        </div>)
                })}
            </div>

            {/* <div
                key={document.id}
                className={`group relative flex flex-col justify-start items-center p-4 rounded-md hover:bg-gray-100 ${checked && 'bg-gray-100'
                    }`}
                onMouseEnter={() => {
                    onMouseEnter();
                }}
                onMouseLeave={() => {
                    onMouseLeave();
                }}
            >
                {(visable || checked) && (
                    <input
                        type={'radio'}
                        value={document.id}
                        name="document"
                        className=" absolute top-2 right-2"
                        onChange={(e) => {
                            check(e);
                        }}
                    />
                )}
                <div className="w-3/4 h-60 rounded-md overflow-hidden group-hover:opacity-75">
                    {document.storage_url.split(/[#?]/)[0].split('.').pop().trim() === 'pdf' ? (
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
                <div className="mt-2 flex justify-center items-center">
                    <a href={document.storage_url} className="text-center">
                        <p className="relative text-gray-900 text-center text-sm">
                            {document.name}
                        </p>
                        <p className="relative text-gray-400  text-center text-xs">
                            {document.created_at.split('T')[0]} 
                        </p>
                    </a>
                </div>
            </div> */}
        </>
    );
}