import React from 'react'
import userIcon from "../icons/user-circle-svgrepo-com.svg"

const UserCard = ({username, email}) => {
  return (
    <div className='flex h-14 items-center justify-between px-2 sm:px-5'>
      <img src={userIcon} className='w-7 h-7' alt="avatar" />
      <div className='flex flex-col gap-5'>
        <h4 className='text-lg block overflow-hidden text-ellipsis w-[100%]'>{username}</h4>
        <p className='text-sm opacity-80 block overflow-hidden text-ellipsis w-[100%]'>{email}</p>
      </div>
    </div>
  )
}

export default UserCard