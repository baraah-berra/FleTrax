import React from 'react'

type Props = {
  active?: boolean
}

const TurnOff = ({ active }: Props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.406 2.63634C13.1464 2.89599 13.0006 3.2481 13.0006 3.61524C13.0006 3.98238 13.1464 4.33448 13.406 4.59413C14.2773 5.4655 14.8707 6.57568 15.1111 7.7843C15.3515 8.99291 15.2281 10.2457 14.7566 11.3842C14.285 12.5226 13.4864 13.4957 12.4618 14.1803C11.4372 14.865 10.2325 15.2304 9.00026 15.2304C7.76797 15.2304 6.56335 14.865 5.53874 14.1803C4.51413 13.4957 3.71554 12.5226 3.24396 11.3842C2.77237 10.2457 2.64898 8.99291 2.88939 7.7843C3.12979 6.57568 3.72319 5.4655 4.59454 4.59413C4.84675 4.333 4.98631 3.98325 4.98316 3.62022C4.98 3.25719 4.83439 2.90992 4.57768 2.65321C4.32096 2.3965 3.9737 2.25088 3.61067 2.24773C3.24763 2.24457 2.89789 2.38413 2.63675 2.63634C1.37804 3.89495 0.520824 5.49855 0.173506 7.24434C-0.173813 8.99014 0.00436778 10.7997 0.685514 12.4443C1.36666 14.0888 2.52018 15.4944 4.00019 16.4833C5.48021 17.4723 7.22025 18.0001 9.00026 18.0001C10.7803 18.0001 12.5203 17.4723 14.0003 16.4833C15.4803 15.4944 16.6339 14.0888 17.315 12.4443C17.9962 10.7997 18.1743 8.99014 17.827 7.24434C17.4797 5.49855 16.6225 3.89495 15.3638 2.63634C15.1041 2.37677 14.752 2.23096 14.3849 2.23096C14.0177 2.23096 13.6656 2.37677 13.406 2.63634Z" fill="#5271FF" fill-opacity={active ? "1" : "0.5"} />
      <path d="M9.00027 8.86128C9.36692 8.85946 9.71803 8.713 9.9773 8.45374C10.2366 8.19447 10.383 7.84336 10.3848 7.4767V1.38457C10.3848 1.01736 10.239 0.665191 9.97931 0.405533C9.71965 0.145874 9.36748 0 9.00027 0C8.63305 0 8.28088 0.145874 8.02123 0.405533C7.76157 0.665191 7.61569 1.01736 7.61569 1.38457V7.4767C7.61751 7.84336 7.76397 8.19447 8.02324 8.45374C8.2825 8.713 8.63362 8.85946 9.00027 8.86128Z" fill="#5271FF" fill-opacity={active ? "1" : "0.5"} />
    </svg>
  )
}

export default TurnOff