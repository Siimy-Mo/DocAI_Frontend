import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { withTheme } from '@rjsf/core';
import FormFilterDropdown from '../../../../components/common/Widget/FormFilterDropdown';
import MyDateDropdown from '../../../../components/common/Widget/MyDateDropdown';
import HeadView from '../../../../components/feature/search/HeadView';

const Form = withTheme(Bootstrap4Theme);

interface FormFilterViewProps {
    formSchema: any;
    selectedFilter: any[];
    setSelectedFilter: (selectedFilter: never[]) => void;
}

function FormFilterView(props: FormFilterViewProps) {
    const { formSchema = {}, selectedFilter = [], setSelectedFilter } = props;
    return (
        <>
            <div className="mx-auto h-[calc(100vh-18.5rem)] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <HeadView {...{ formSchema, selectedFilter, setSelectedFilter }} />
                    <header className="shadow bg-white">
                        <div className="   py-6 px-4 sm:px-6 lg:px-8  flex justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                文檔：{formSchema.name}
                            </h1>
                        </div>
                    </header>
                    <div className="py-4">
                        <div className="flex flex-row mt-4 mb-4 flex-wrap">
                            {selectedFilter.map((filter, index) => {
                                return (
                                    <div className="mx-2" key={index}>
                                        <label className="mr-2">
                                            {formSchema.form_schema.properties[`${filter}`].title}:
                                        </label>
                                        <FormFilterDropdown
                                            formSchema={
                                                formSchema.form_schema.properties[`${filter}`]
                                            }
                                            formData={formSchema.data_schema[`${filter}`]}
                                            title={
                                                formSchema.form_schema.properties[`${filter}`].title
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {/* <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-white text-lg font-medium text-indigo-500">
                                    結果
                                </span>
                            </div>
                        </div> */}
                        <div className="flex w-full items-center justify-center text-center py-2">
                            <div className="overflow-hidden w-full text-center items-center justify-center shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="w-full text-left divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                名稱
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                值
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {[1, 2, 3, 4].map((item, index) => (
                                            <tr key={index} className="divide-x divide-gray-200">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {item}
                                                </td>
                                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                                                    {item}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default FormFilterView;
