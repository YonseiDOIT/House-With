import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

type CustomSelectProps = {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
};

const CustomSelect = ({ options, selected, setSelected }: CustomSelectProps) => {
  return (
    <div className="relative w-[250px]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full h-12 pl-4 pr-10 text-left text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm cursor-default">
            {selected || '학사를 선택해주세요'}
            <span className="absolute inset-y-0 flex items-center pointer-events-none right-2">
              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 w-[111px] py-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none right-0">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-3 px-4 text-gray-800 ${
                    active ? 'bg-gray-100' : ''
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 flex items-center text-black right-3">
                        <CheckIcon className="w-4 h-4" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
