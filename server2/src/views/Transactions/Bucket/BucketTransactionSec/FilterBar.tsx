import React from 'react';

const FilterBar:React.FC<{handleUpdate: (input:string) => void}> = ({handleUpdate}) => {

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate(event.currentTarget.value)
  }

  return (
     <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            type="search"
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="filter"
            placeholder="Search"
            onChange={handleChange}
          />
        </div>
      </div>
  )
}

export default FilterBar;