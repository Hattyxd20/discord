"use client"
import { Plus } from 'lucide-react'
import ActionToolTip from '../action-tooltip'
import React from 'react'
import { useModal } from '@/hooks/use-modal-store'


const NavigationAction = () => {
  const {onOpen} = useModal();

  return (
    <div>
      <ActionToolTip
        label='Add a server'
        side='right'
        align='center'
      >
        <button 
         onClick={() => onOpen('createServer',{})}
         className='group'>
          <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'>
           <Plus
            className='group-hover:text-white transitiont text-emerald-500'
            size={25}
           />
         </div>
         </button>
      </ActionToolTip>
    </div>
  )
}

export default NavigationAction