import React from "react"
import Icon from '@/components/ui/Icon/Icon';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
const RowLabels = (names,othername,iconName,...props) => {
    return <React.Fragment>
        <div style={{ display: "flex" }}>
            <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>{iconName}</Icon>
            <div style={{ margin: "auto 0 ", }}>{[names, othername].join(' ')}</div>
        </div>

    </React.Fragment>
}

export {
    RowLabels,

}