import React, { KeyboardEventHandler, useEffect, useRef, useState, createRef} from "react";
import Text from "../../atoms/Text";

const KEY_CODES = {
    ENTER: 'Enter',//13,
    SPACE: 'Space',//32,
    DOWN_ARROW: 'ArrowDown', //40,
    ESC: 'Esc',//27
    UP_ARROW: 'ArrowUp',
}

interface SelectOption {
    label: string,
    value: string
}

interface RenderOptionProps {
    isSelected: boolean,
    option: SelectOption,
    getOptionRecommendProps: (overrideProps?: Object) => Object
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void,
    options?: SelectOption[],
    label?: string,
    renderOption?: (props: RenderOptionProps) => React.ReactNode
}

const getPreviousOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === 0) {
        return options.length - 1
    }

    return currentIndex - 1
}

const getNextOptionIndex = (currentIndex: number|null, options:Array<SelectOption>) => {
    if(currentIndex === null){
        return 0
    }
    if(currentIndex === options.length - 1){
        return 0
    }

    return currentIndex + 1
}
 

const Select: React.FC<SelectProps> = ({options=[], label='Please select an option ...', onOptionSelected: handler = () => {}, renderOption}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<null|number>(null)
    const [highlightedIndex, setHighlightedIndex] = useState<null|number>(null)
    const labelRef = useRef<HTMLButtonElement>(null)
    const [overlayTop, setOverlayTop] = useState<number>(0)
    const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        
        if(handler){
            handler(option, optionIndex)
        }
        setSelectedIndex(optionIndex)
        setIsOpen(false)
    }

    const onLabelClick = () => {
        setIsOpen(!isOpen)
    }

    let selectedOption = null
    if(selectedIndex !== null){
        selectedOption = options[selectedIndex]
    }

    const highlightOption = (optionIndex: number|null) => {
        setHighlightedIndex(optionIndex)
    }

    useEffect(() => {
        setOverlayTop(
            (labelRef.current?.offsetHeight || 0) + 10
        )
    }, [labelRef.current?.offsetHeight])

    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        event.preventDefault()

        if([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.key)){
            setIsOpen(true)
            highlightOption(0)
        }
    }

    useEffect(() => {   
        setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
    }, [options.length])

    useEffect(() => {
        if(highlightedIndex !== null && isOpen){
            const ref = optionRefs[highlightedIndex]
            if(ref && ref.current){
                ref.current.focus()
            }
        }
    }, [isOpen,highlightedIndex])

    const onOptionKeyDown: KeyboardEventHandler = (event) => {
        
        if (event.key === KEY_CODES.ESC) {
            setIsOpen(false)

            return
        }

        if (event.key === KEY_CODES.DOWN_ARROW) {
            highlightOption(getNextOptionIndex(highlightedIndex, options))
        }

        if (event.key === KEY_CODES.UP_ARROW) {
            highlightOption(
                getPreviousOptionIndex(highlightedIndex, options)
            )
        }
        
        if (event.key === KEY_CODES.ENTER) {
            onOptionSelected(options[highlightedIndex!], highlightedIndex!)
        }

    }


   return <div className="atomp-select">
        <button data-testid="atompSelectButton" onKeyDown={onButtonKeyDown} aria-controls='atomp-select-list' aria-haspopup={true} aria-expanded={isOpen ? true : undefined} ref={labelRef} className="atomp-select__label" onClick={onLabelClick}>
            <Text>{selectedOption === null ? label : selectedOption.label}</Text>
            <svg className={`atomp-select__caret ${isOpen ? 'atomp-select__caret--open' : 'atomp-select__caret--closed' }`} width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen ? (<ul role="menu" id="atomp-select-list" style={{top: overlayTop}} className="atomp-select__overlay">
            {options.map((option, optionIndex) => {
                const isSelected = selectedIndex === optionIndex
                const isHighlighted = highlightedIndex === optionIndex

                const ref = optionRefs[optionIndex]

                const renderOptionProps = {
                    option,
                    isSelected,
                    key: option.value,
                    getOptionRecommendProps: (overrideProps = {}) => {
                       return {
                        ref,  
                        role: 'menuitemradio',
                        'aria-label': option.label,
                        'aria-checked': isSelected ? true : undefined,
                        tabIndex: isHighlighted ? -1 : 0,
                        onKeyDown: onOptionKeyDown,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        className: `atomp-select__option 
                        ${isSelected ? 'atomp-select__option--selected' : ''}
                        ${isHighlighted ? 'atomp-select__option--highlighted' : ''}
                         `,
                        key: option.value,
                        onClick:() => onOptionSelected(option, optionIndex), 
                         ...overrideProps
                       }
                    }
                }

                if(renderOption) {
                    return renderOption(renderOptionProps)
                }
                
                return <li 
                    {...renderOptionProps.getOptionRecommendProps()}
                    >
                        <Text>
                        {option.label}
                        </Text>
                        {
                            isSelected ? 
                            (<svg width='1rem' height='1rem' fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" /></svg>)
                            : null

                        }
                    </li>
            })}
        </ul>) : null}
   </div>
}

export default Select