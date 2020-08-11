import React from "react"
import Icon from '@/components/ui/Icon/Icon';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
import Router from 'next/router';
const renderLabel = (rowData, HandleElementClick) => {
    return <React.Fragment>
        <div style={{ display: "flex" }}
            onClick={() => {
                if (HandleElementClick) HandleElementClick(10, {
                    id: rowData._id,
                    label: rowData.name_auth
                })
            }}>
            <Icon style={{ margin: "auto 0 ", width: "30px", color: "gray" }}>person</Icon>
            <div style={{ margin: "auto 0 ", }}>{[rowData.name_auth, rowData.indexname_auth].join(' ')}</div>
        </div>

    </React.Fragment>
}
 
export {
    renderLabel,

}
