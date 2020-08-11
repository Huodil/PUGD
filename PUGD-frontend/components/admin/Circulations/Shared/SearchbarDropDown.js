import React, {useState} from 'react'

const SearchbarDropDown = () => {

    const [open,setOpen] = useState(false)
    const [selected,setSelected] = useState([])
    const toggle = () => setOpen(!open)

    function handlerOnclick(item){}

    return <React.Fragment>
        <div className="input-field">
            <div
                tabIndex={0}
                className="browser-default"
                role="Button"
                onkeyPress={()=> toggle(!open)}
            >
                {open ? 'open' : 'close'}
                <span> hello</span>
            </div>
        </div>

    </React.Fragment>
}

export default SearchbarDropDown

