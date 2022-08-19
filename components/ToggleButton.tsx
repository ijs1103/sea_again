import { cls } from '@utils/index'
import { useRouter } from 'next/router'
import { useState } from 'react'

type Setter = () => void
interface Props {
	setRePaintFlag: Setter
	setTopTen: Setter
	removeTopTen: Setter
}
export default function ToggleButton({ setRePaintFlag, setTopTen, removeTopTen }: Props) {
	const router = useRouter()
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
	//w-40
	return (
		<div className='absolute w-40 top-20 right-4'>
			<div className='flex items-center justify-between px-3 py-2 text-gray-900 shadow-2xl bg-gray-50 rounded-2xl'>
				<div
					onClick={toggleTopTen}
					className="shrink-0 relative  h-[30px] w-[60px] cursor-pointer shadow-2xl"
				>
					<div className={cls("absolute top-[2px] h-[26px] w-[26px] rounded-full bg-white transition-[left] duration-300 ", active ? "left-[32px]" : "left-[2px]")}></div>
					<div className={cls("flex h-full rounded-[20px] text-white shadow-2xl transition-[background-color] duration-300 ", active ? "bg-primary" : "bg-toggleOff")}>
						<div className="w-1/2 text-center leading-[40px]"></div>
						<div className="w-1/2 text-center leading-[40px]"></div>
					</div>
				</div>
				<span className='block text-[14px] font-bold text-gray-700 truncate'>TOP 10 해수욕장</span>
			</div>
		</div>
	)
}
