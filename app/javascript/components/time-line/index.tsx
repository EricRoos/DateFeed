import * as React from 'react';

const TimeLineItem = ({children}) => (
  <li className="mb-5  ">
    <div className="flex group items-center ">
      <div className="bg-gray-800 group-hover:bg-red-700 z-10 rounded-full border-4 border-black  h-5 w-5">
        <div className="bg-black h-1 w-6 items-center  ml-4 mt-1"></div>
      </div>
      <div className="flex-1 ml-4 z-10 font-medium">
        <div className="order-1 space-y-2 bg-gray-800 rounded-lg shadow-only transition-ease lg:w-5/12 px-6 py-4">
          { children }
        </div>
      </div>
    </div>
  </li>
)

interface TimeLineProps {
  children: React.ReactElement<typeof TimeLineItem> | React.ReactElement<typeof TimeLineItem>[];
}

const TimeLine = (props : TimeLineProps) => (
  <div className="py-10 container mx-auto px-5">
    <div className="relative">
      <div className="border-r-4 border-black absolute h-full top-0" style={{ 'left': '9px' }}></div>
      <ul className="list-none m-0 p-0">
        { props.children }
      </ul>
    </div>
  </div>
)

TimeLine.Item = TimeLineItem;

export default TimeLine;
