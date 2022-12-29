import { useState } from "react"

function Contents() {
    const defaultNumber = 23
    const column = 4
    const row = 7

    const members = [
        'vena.lee', 
        'qoo.hoony', 
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

    // const init = () => {
    //     setSeatResult([])
    //     clearInterval(action)
    // }

    const apply = () => {
        seatInterval()
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
        members.forEach(item => {
            const randomIndex = randomNum(27)
            if (!restoreMember[randomIndex]) {
                restoreMember[randomIndex] = item
            }
            
        })
        return restoreMember
    }

    
    const randomNum = (max) => {
        var randNum = Math.floor(Math.random()*(max-1)) + 1;
        return randNum;
    }

    const seatMap = () => {
        let arrIndex = 0
        const result = []
        for (let i = 0; i < row; i++) {
            const columnMap = []
            for (let j = 0; j < column; j++) {
                const seatNumber = defaultNumber+i+(j*row)
                
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