import React, { useState, useContext, useEffect, useMemo } from 'react';
import WaterContext from '../../context/water/waterContext';
import AlertContext from '../../context/alert/alertContext';
import ProgressBar from './ProgressBar';
import WaterHistory from './WaterHistory';

const cupIcon = 
<svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M 12 2 L 12 6 L 14 6 L 14 2 Z M 16 3 L 16 6 L 18 6 L 18 3 Z M 6 7 L 6 25 C 6 26.644531 7.355469 28 9 28 L 21 28 C 22.644531 28 24 26.644531 24 25 L 24 20 L 26 20 C 27.644531 20 29 18.644531 29 17 L 29 14 C 29 12.355469 27.644531 11 26 11 L 24 11 L 24 7 Z M 8 9 L 22 9 L 22 25 C 22 25.554688 21.554688 26 21 26 L 9 26 C 8.445313 26 8 25.554688 8 25 Z M 24 13 L 26 13 C 26.554688 13 27 13.445313 27 14 L 27 17 C 27 17.554688 26.554688 18 26 18 L 24 18 Z"/>
</svg>

const Water = () => {
    const waterContext = useContext(WaterContext);
    const alertContext = useContext(AlertContext);

    const { waterToday, drinkWater, setWater, updateWater, updateGoal, updateCupAmount, getToday, loading, error, clearErrors } = waterContext;

    const { setAlert } = alertContext;

    const [customAmount, setCustomAmount] = useState(0);

    const [waterAmountActive, setWaterAmountActive] = useState(false);

    const [waterAmount, setWaterAmount] = useState(waterToday?.water);

    const [waterGoalActive, setWaterGoalActive] = useState(false);

    const [waterGoal, setWaterGoal] = useState(waterToday?.goal);

    const [cupSizeActive, setCupSizeActive] = useState(false);

    const [cupSize, setCupSize] = useState(waterToday?.cupSize);

    const currentWater = useMemo(() => {
        return waterToday?.water || 0
    }, [waterToday?.water])

    useEffect(() => {
        getToday();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateWater(currentWater);
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [currentWater, updateWater]);

    useEffect(() => {
        if (!!error) {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, setAlert, clearErrors])

    const handleDrinkOneCup = () => {
        drinkWater(waterToday.cupSize);
    }

    const handleDrinkAnyAmount = () => {
        drinkWater(Number(customAmount));
        setCustomAmount(0);
    }

    const handleChangeCustomAmount = e => {
        setCustomAmount(e.target.value);
    }

    const handleChangeWaterAmount = e => {
        setWaterAmount(e.target.value);
    }

    const handleClickChangeAmount = () => {
        setWaterAmountActive(true);
    }

    const handleClickConfirmAmount = () => {
        if (waterAmount >= 0) {
            setWater(Number(waterAmount));
            setWaterAmountActive(false);
        } else {
            window.alert('change water amount to a number > 0')
        }
    }

    const handleChangeWaterGoal = e => {
        setWaterGoal(e.target.value);
    }

    const handleClickChangeGoal = () => {
        setWaterGoalActive(true);
    }

    const handleClickConfirmGoal = () => {
        if (waterGoal > 100) {
            updateGoal(waterGoal);
            setWaterGoalActive(false);
        } else {
            window.alert('change water goal to a number > 100 mL!')
        }
    }

    const handleChangeCupSize = e => {
        setCupSize(e.target.value);
    }

    const handleClickChangeCupSize = () => {
        setCupSizeActive(true);
    }

    const handleClickConfirmCupSize = () => {
        if (cupSize >= 0 && cupSize <= 1000) {
            updateCupAmount(Number(cupSize));
            setCupSizeActive(false);
        } else {
            window.alert('change cup size to a number between 0 and 1000')
        }
    }

    return (
        !loading && !!waterToday 
            ? <>
                <div className='waterContainer'>
                    <div className='leftColumn'>
                        <div className='waterStatus'>
                            I drink 
                                { waterAmountActive 
                                    ? <input 
                                        type="number" 
                                        id='setWaterAmountToday' 
                                        name='waterAmountToday' 
                                        min='0'
                                        max='10000'
                                        step='100'
                                        defaultValue={waterToday.water}
                                        onChange={handleChangeWaterAmount}
                                    ></input>
                                    : <p className='waterAmount'>{ waterToday.water }</p>}
                            mL of water today
                            { !waterAmountActive && <button 
                                className='changeAmountBtn'
                                onClick={handleClickChangeAmount}
                            >
                                Change
                            </button>}
                            { waterAmountActive && <button 
                                className='confirmAmountBtn'
                                onClick={handleClickConfirmAmount}
                            >
                                Confirm
                            </button>}
                        </div>
                        <div className='waterGoal'>{`Goal: `}
                            { waterGoalActive 
                                ? <div>
                                    <input 
                                        type="number" 
                                        id='setWaterGoal' 
                                        name='waterGoal' 
                                        min='0'
                                        max='10000'
                                        step='100'
                                        defaultValue={waterToday.goal}
                                        onChange={handleChangeWaterGoal}
                                    ></input>
                                    <label htmlFor='setWaterGoal'>mL</label>
                                </div>  
                                : <span className='goalText'>
                                    { waterToday.goal } mL
                                </span>
                            }           
                            { !waterGoalActive && <button 
                                className='changeGoalBtn'
                                onClick={handleClickChangeGoal}
                            >
                                Change
                            </button>}
                            { waterGoalActive && <button 
                                className='confirmGoalBtn'
                                onClick={handleClickConfirmGoal}
                            >
                                Confirm
                            </button>}
                        </div>
                        <ProgressBar progress={waterToday.water/waterToday.goal*100}/>
                    </div>
                    <div className='rightColumn'>
                        <div className='drinkBtns'>
                            <div className='oneCupBtn'>
                                <div className='oneCupIcon' onClick={handleDrinkOneCup}>
                                    { cupIcon }
                                </div>
                                <div className='drinkOneCup'>Drink One Cup -
                                    { cupSizeActive 
                                        ? <div>
                                            <input 
                                                type="number" 
                                                id='setCupSize' 
                                                name='cupSize' 
                                                min='0'
                                                max='1000'
                                                step='50'
                                                defaultValue={waterToday.cupSize}
                                                onChange={handleChangeCupSize}
                                            ></input>
                                        </div>
                                        : <p className='cupSize'>{ waterToday.cupSize }</p> }
                                    mL
                                    { !cupSizeActive && <button 
                                        className='changeCupSizeBtn'
                                        onClick={handleClickChangeCupSize}
                                    >
                                        Change
                                    </button>}
                                    { cupSizeActive && <button 
                                        className='confirmCupSizeBtn'
                                        onClick={handleClickConfirmCupSize}
                                    >
                                        Confirm
                                    </button>}
                                </div>
                            </div>
                            <div className='anyAmountBtn'>
                                <div className='anyAmountIcon' onClick={handleDrinkAnyAmount}>
                                </div>
                                <div>
                                    <span className='anyAmountText'>Drink </span>
                                        <input 
                                            type='number'
                                            name='anyAmount'
                                            value={customAmount}
                                            min='0' 
                                            max='3000'
                                            step='50'
                                            onChange={handleChangeCustomAmount}
                                        />
                                    <span className='anyAmountText'> mL Water</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <WaterHistory />
            </>
        : <p>Loading...</p>
    )
}

export default Water
