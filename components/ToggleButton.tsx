import { cls } from '@utils/index'
import { useState } from 'react'

type Setter = () => void
interface Props {
	setRePaintFlag: Setter
	setTopTen: Setter
	removeTopTen: Setter
}
export default function ToggleButton({ setRePaintFlag, setTopTen, removeTopTen }: Props) {
	const [active, setActive] = useState(false)
	const toggleTopTen = async () => {
		if (active) {
			setActive(false)
			removeTopTen()
		} else {
			setActive(true)
			setTopTen()
		}
		setRePaintFlag()
	}
	return (
		<>
			<div className='absolute w-max sm:w-40 top-20 right-4'>
				<span className={cls('block w-full text-xs font-bold text-center bg-white shadow-2xl rounded-2xl  sm:hidden ', active ? 'text-primary' : 'text-pink-300')}>TOP 10</span>
				<div className='flex items-center justify-between py-2 text-gray-900 bg-transparent sm:shadow-2xl sm:px-3 sm:bg-gray-50 rounded-2xl'>
					<div
						onClick={toggleTopTen}
						className="shrink-0 relative h-[30px] w-[60px] cursor-pointer shadow-2xl"
					>
						<div className={cls("absolute top-[2px] h-[26px] w-[26px] rounded-full bg-white transition-[left] duration-300 ", active ? "left-[32px]" : "left-[2px]")}></div>
						<div className={cls("flex h-full rounded-[20px] text-white shadow-2xl transition-[background-color] duration-300 ", active ? "bg-primary" : "bg-toggleOff")}>
							<div className="w-1/2 text-center leading-[40px]"></div>
							<div className="w-1/2 text-center leading-[40px]"></div>
						</div>
					</div>
					<span className='hidden sm:block text-[14px] font-bold text-gray-700 truncate'>TOP 10 해수욕장</span>
				</div>
			</div>
		</>
	)
}
