import { ClipboardListIcon, CogIcon, UserCircleIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import Progress from '../../common/Widget/Progress';
import EditProjectModal from './EditProjectModal';

interface ProjectRowProps {
    project: any;
    updateProjectHandler: any;
}

export default function ProjectRow(props: ProjectRowProps) {
    const { project, updateProjectHandler } = props;
    const [visiable, setVisiable] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row px-2 py-0 items-center cursor-pointer justify-between">
                        <div className="flex flex-1 flex-row items-center">
                            <ClipboardListIcon className="w-4 m-2" />
                            <Link href={`/project/${project?.id}`}>
                                <a className=" text-sm hover:underline">{project?.name}</a>
                            </Link>
                        </div>
                        <div className="flex w-1/6">
                            <Progress value={project?.progress} />
                        </div>
                    </div>
                    <div className="flex px-2 items-center justify-between">
                        <div className="flex flex-row items-center">
                            <UserCircleIcon className="w-4 m-1" />
                            <label className="text-xs text-gray-400">
                                {project?.user?.nickname}
                            </label>
                            <label className="text-xs ml-4 text-gray-400">
                                截止日期:{' '}
                                {project?.deadline_at &&
                                    moment(project?.deadline_at).format('YYYY-MM-DD')}
                            </label>
                        </div>

                        <div className="flex flex-row items-center">
                            <CogIcon
                                className="w-4"
                                onClick={() => {
                                    setVisiable(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EditProjectModal
                visable={visiable}
                setMode={''}
                project={project}
                movingDest={''}
                cancelClick={() => {
                    setVisiable(false);
                }}
                confirmClick={(data: any) => {
                    setVisiable(false);
                    updateProjectHandler(data);
                }}
            />
        </>
    );
}
