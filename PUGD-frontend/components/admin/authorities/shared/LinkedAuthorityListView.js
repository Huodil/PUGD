import React from 'react';

import LinkedAuthorityView from '@/components/admin/authorities/shared/LinkedAuthorityView';
import Card from '@/components/ui/Card/Card';


const LinkedAuthorityListView = ({ Linked_authorities, OnAuthorityLinkChange }) => {

    return Linked_authorities.length>0  && <Card >
        {
            Linked_authorities.map(((authority, index) => {
                if(authority!==undefined)
                return <LinkedAuthorityView
                    key={index}
                    Authority={authority}
                    OnAuthorityLinkChange={OnAuthorityLinkChange}
                    index={index}
                />
            }))
        }
    </Card>

}
export default LinkedAuthorityListView