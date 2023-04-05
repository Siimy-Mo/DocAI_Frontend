import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../apis/index';
import useAlert from '../../hooks/useAlert';
import GenerateView from './GenerateView';

const apiSetting = new Api();

function GenerateContainer() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const [document, setDocument] = useState<any>()
    const [generateContent, setGenerateContent] = useState('');
    const [open, setOpen] = useState(false);

    const [{ data: getDocumentByIdData }, getDocumentById] = useAxios(
        apiSetting.Document.getDocumentById(`${router.query.document_id}`),
        { manual: false }
    );

    const [{ data: getGenerateData }, getGenerate] = useAxios("",
        { manual: true }
    );

    useEffect(() => {
        if (getDocumentByIdData && getDocumentByIdData.success === true) {
            // console.log("getDocumentByIdData", getDocumentByIdData);
            setDocument(getDocumentByIdData.document);
        }
    }, [getDocumentByIdData]);

    const handleQuery = useCallback(
        async (query: string) => {
            // console.log("query", query);
            setOpen(true)
            const res = await getGenerate(
                apiSetting.Generate.query(document.id, query)
            );
            setOpen(false)

            if (res.data?.success) {
                setGenerateContent(res.data?.response?.content)
            } else {
                setAlert({ title: '發生錯誤', type: 'error' });
            }
        },
        [router, document]
    );

    return (
        <>
            <GenerateView {...{ document, handleQuery, open, setOpen, generateContent, setGenerateContent, setAlert }} />
        </>
    );
}

export default GenerateContainer;