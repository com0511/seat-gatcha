import { useState } from "react"

function Contents() {
    const maxSeatNumber = 27
    const startSeatNumber = 23
    const column = 4
    const row = 7

    // 고정좌석은 좌측 상단부터 0,1,2,3....의 위치 index를 가진다.
    const fixedMember = [
        {number: 3, name: 'qoo.hoony'}, 
        {number: 7, name: '신규입사자'}
    ]

    const members = [
        'vena.lee', 
        'hue.jung', 
        'jay.doh', 
        'joshua.thedev', 
        'scarlett.kim', 
        'siena.jeong', 
        'minnie.1218', 
        'dobby.isfree', 
        'lucy.0517', 
        'wade.jeong', 
        'flynn.jin', 
        'liz.s', 
        'mason.jin', 
        'linda.y', 
        'bean.zino', 
        'smoothie.k', 
        'connie.eun', 
        'kate.louis', 
        'hedy.kim',
        'soo.bae',
        'jenna.sung'
    ]

    const [seatResult, setSeatResult] = useState([])
    let [loopCount, setLoopCount] = useState(0)
    let [isFinish, setIsFinish] = useState(false)
    
    let interval = 50
    let action = null

    const init = () => {
        interval = 50
        action = null
        setLoopCount(0)
        setSeatResult([])
        setIsFinish(false)
    }

    const apply = () => {
        init()
        seatInterval()
    }

    const suffleNumber = () => {
        const numberArray = []
        for(let i = 0; i < maxSeatNumber; i++) {
            numberArray.push(i)
        }
        return numberArray.sort(() => Math.random() - 0.5)
    }

    const seatInterval = () => {
        clearInterval(action)
        if (loopCount >= 100) {
            interval = interval + 50
        }
        // setIntervalTime(interval)
        setLoopCount(loopCount++)
        setSeatResult(gatcha())
        if (interval < 1000) {
            action = setInterval(seatInterval, interval)
        } else {
            setIsFinish(true)
        }
    }
    
    const gatcha = () => {
        const restoreMember = [];
        suffleNumber().forEach((item, index) => {
            const exsistFixed = validate(item)
            if (exsistFixed) {
                restoreMember[item] = exsistFixed.name
            } else {
                if (members[index]) {
                    restoreMember[item] = members[index]
                } else {
                    restoreMember[item] = null
                }
            }
            
        })
        return restoreMember
    }

    const validate = (item) => {
        return fixedMember.filter(fixedItem => {
            if (fixedItem.number === item) {
                return item
            }
        })[0]
    }

    const seatMap = () => {
        let arrIndex = 0
        const result = []
        for (let i = 0; i < row; i++) {
            const columnMap = []
            for (let j = 0; j < column; j++) {
                const seatNumber = startSeatNumber + i + (j*row)
                
                const innerNumber = seatNumber >= 37 ? seatNumber - 1 :  seatNumber
                columnMap.push(
                    <td className={(seatNumber === 37 ? 'hidden-seat' : '')} key={seatNumber}>
                        {innerNumber}
                        <p>{seatResult[arrIndex]}</p>
                    </td>
                )
                arrIndex++
            }
            result.push(<tr key={i}>{columnMap}</tr>)
        }
        
        return result
    }
    return (
        <div className="contents-body">
            <div>
                {isFinish ?
                    <p>배정 완료!</p> : null
                }
                {/* <button onClick={init}>initialize</button> */}
                <button onClick={apply}>start</button>
            </div>
            <div>
                <table>
                    <tbody>
                        {seatMap()}
                    </tbody>
                </table>
            </div>
                
            
        </div>
    )
}

export default Contents;