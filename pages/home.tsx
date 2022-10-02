import type { NextPage } from 'next';
import Head from 'next/head';
import useAxios from 'axios-hooks';
import SimpleLayout from '../components/layout/SimpleLayout';
import withLayout from '../components/hocs/withLayout';
import {
    FolderIcon,
    DocumentSearchIcon,
    SearchCircleIcon,
    ShieldCheckIcon,
    UploadIcon,
    CloudUploadIcon,
    ClipboardCheckIcon,
    SortAscendingIcon,
    CloudIcon,
    TagIcon
} from '@heroicons/react/outline';
import Api from '../apis/index';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DriveContainer from './drive/DriveContainer';

const apiSetting = new Api();

const absenceFormAction = [
    {
        title: '請假表識別',
        href: '/absence/upload',
        icon: UploadIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50'
    },
    {
        title: '請假表搜尋',
        href: '/absence/search',
        icon: SearchCircleIcon,
        iconForeground: 'text-orange-700',
        iconBackground: 'bg-orange-50'
    },
    {
        title: '請假表審批',
        href: '/absence/approval',
        icon: ShieldCheckIcon,
        iconForeground: 'text-blue-700',
        iconBackground: 'bg-blue-50'
    }
];

const classificationActions = [
    {
        title: '文件分類',
        href: '/classification',
        icon: FolderIcon,
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50'
    },
    {
        title: '上傳文件',
        href: '/classification/upload',
        icon: CloudUploadIcon,
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50'
    },
    {
        title: '同一類型批量上傳文件',
        href: '/classification/upload/bulk',
        icon: SortAscendingIcon,
        iconForeground: 'text-cyan-700',
        iconBackground: 'bg-cyan-50'
    },
    {
        title: '文件驗證',
        href: '/classification/validate',
        icon: ClipboardCheckIcon,
        iconForeground: 'text-red-700',
        iconBackground: 'bg-red-50'
    }
];

const documentAction = [
    {
        title: '文件搜尋',
        href: '/search',
        icon: DocumentSearchIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50'
    },
    {
        title: '多層資料夾',
        href: '/drive',
        icon: CloudIcon,
        iconForeground: 'text-green-700',
        iconBackground: 'bg-green-50'
    }
];

const settingAction = [
    {
        title: '標籤管理',
        href: '/setting/label',
        icon: TagIcon,
        iconForeground: 'text-violet-700',
        iconBackground: 'bg-violet-50'
    }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

interface StatisticProps {
    count: number;
    tag: string;
}

const Home: NextPage = () => {
    const [statistics, setStatistics] = useState([]);
    const [{ data: countTagsByDateData }, countTagsByDate] = useAxios(
        apiSetting.Statistics.countTagsByDate(
            new Date().toLocaleString('fr-CA', { timeZone: 'Asia/Taipei' }).split(' ')[0]
        ),
        { manual: true }
    );
    const [{ data: countDocumentsByDateData }, countDocumentsByDate] = useAxios(
        apiSetting.Statistics.countDocumentsByDate(
            new Date().toLocaleString('fr-CA', { timeZone: 'Asia/Taipei' }).split(' ')[0]
        ),
        { manual: true }
    );
    useEffect(() => {
        axios.defaults.headers.common['authorization'] =
            localStorage.getItem('authorization') || '';
    }, []);
    useEffect(() => {
        countTagsByDate();
        countDocumentsByDate();
    }, [countTagsByDate, countDocumentsByDate]);
    useEffect(() => {
        if (countTagsByDateData && countTagsByDateData.success === true) {
            if (countTagsByDateData.tags_count.length > 3) {
                setStatistics(countTagsByDateData.tags_count.slice(0, 3));
            } else {
                setStatistics(countTagsByDateData.tags_count);
            }
        }
    }, [countTagsByDateData]);
    return (
        <div>
            <Head>
                <title>DocAI</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-50 pt-12 sm:pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">DocAI</h2>
                        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            本日新增的文件數量：{countDocumentsByDateData?.documents_count || 0}份
                        </p>
                    </div>
                </div>
                <div className="mt-10 pb-12 bg-white sm:pb-16">
                    <div className="relative">
                        <div className="absolute inset-0 h-1/2 bg-gray-50" />
                        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                {statistics.length > 0 ? (
                                    <dl
                                        className={`rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3`}
                                    >
                                        {statistics.map((statistic: StatisticProps, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r"
                                                >
                                                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                                        {statistic.tag ? statistic.tag : '未分類'}
                                                    </dt>
                                                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                                                        {statistic.count}
                                                    </dd>
                                                </div>
                                            );
                                        })}
                                    </dl>
                                ) : (
                                    <dl className="flex justify-center items-center rounded-lg bg-white shadow-lg">
                                        <p className="p-4 text-5xl font-extrabold text-indigo-600">
                                            本日未有新增文件
                                        </p>
                                    </dl>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 pb-8 bg-gray-50">
                <div className="max-w-4xl mx-auto mb-8">
                    <h2 className="my-4 text-2xl font-bold text-gray-900">請假表功能</h2>
                    <div className="rounded-lg overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        {absenceFormAction.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === absenceFormAction.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    actionIdx === absenceFormAction.length - 1
                                        ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                        : '',
                                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div className="flex flex-row items-center">
                                    <span
                                        className={classNames(
                                            action.iconBackground,
                                            action.iconForeground,
                                            'rounded-lg inline-flex p-3 ring-4 ring-white'
                                        )}
                                    >
                                        <action.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <p className="ml-4 text-center text-lg font-medium">
                                        <a href={action.href} className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mb-8">
                    <h2 className="my-4 text-2xl font-bold text-gray-900">文件分類功能</h2>
                    <div className="rounded-lg overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        {classificationActions.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === classificationActions.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    actionIdx === classificationActions.length - 1
                                        ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                        : '',
                                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div className="flex flex-row items-center">
                                    <span
                                        className={classNames(
                                            action.iconBackground,
                                            action.iconForeground,
                                            'rounded-lg inline-flex p-3 ring-4 ring-white'
                                        )}
                                    >
                                        <action.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <p className="ml-4 text-center text-lg font-medium">
                                        <a href={action.href} className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </p>
                                </div>
                                {/* <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        <a href={action.href} className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Doloribus dolores nostrum quia qui natus officia quod et
                                        dolorem. Sit repellendus qui ut at blanditiis et quo et
                                        molestiae.
                                    </p>
                                </div> */}
                                <span
                                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mb-8">
                    <h2 className="my-4 text-2xl font-bold text-gray-900">文件管理</h2>
                    <div className="rounded-lg overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        {documentAction.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === documentAction.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    actionIdx === documentAction.length - 1
                                        ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                        : '',
                                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div className="flex flex-row items-center">
                                    <span
                                        className={classNames(
                                            action.iconBackground,
                                            action.iconForeground,
                                            'rounded-lg inline-flex p-3 ring-4 ring-white'
                                        )}
                                    >
                                        <action.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <p className="ml-4 text-center text-lg font-medium">
                                        <a href={action.href} className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mb-8">
                    <h2 className="my-4 text-2xl font-bold text-gray-900">系統管理</h2>
                    <div className="rounded-lg overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                        {settingAction.map((action, actionIdx) => (
                            <div
                                key={action.title}
                                className={classNames(
                                    actionIdx === 0
                                        ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                                        : '',
                                    actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                    actionIdx === settingAction.length - 2
                                        ? 'sm:rounded-bl-lg'
                                        : '',
                                    actionIdx === settingAction.length - 1
                                        ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                                        : '',
                                    'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                                )}
                            >
                                <div className="flex flex-row items-center">
                                    <span
                                        className={classNames(
                                            action.iconBackground,
                                            action.iconForeground,
                                            'rounded-lg inline-flex p-3 ring-4 ring-white'
                                        )}
                                    >
                                        <action.icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <p className="ml-4 text-center text-lg font-medium">
                                        <a href={action.href} className="focus:outline-none">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {action.title}
                                        </a>
                                    </p>
                                </div>
                                <span
                                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withLayout(Home, SimpleLayout);