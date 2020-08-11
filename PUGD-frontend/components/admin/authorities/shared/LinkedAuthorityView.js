import React from 'react';
import Grid from '@/components/ui/Grid/Grid';
import GridElement from '@/components/ui/Grid/GridElement';
import TextBox from '@/components/ui/TextBox';
import SelectBox from '@/components/ui/SelectBox';
import Collapsible from '@/components/ui/Collapsible/Collapsible';
import CollapsibleHeader from '@/components/ui/Collapsible/CollapsibleHeader';
import CollapsibleBody from '@/components/ui/Collapsible/CollapsibleBody';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import RoundButton from '@/components/ui/RoundButton/RoundButton';
const LinkedAuthorityView = ({ Authority, OnAuthorityLinkChange, index }) => {

    return <div>
        <Collapsible >
            <li>
                <CollapsibleHeader headerHeight={83}>
                    <Grid>
                        <GridElement s={3}>
                            <TextBox
                                disabled
                                label="Authority name"
                                defaultValue={Authority.authorityName}
                            />
                        </GridElement>
                        <GridElement s={3}>
                            {/* <InputLabel id="demo-simple-select-label">Authority</InputLabel> */}
                            <SelectBox
                                label="Authority Type"
                                defaultValue={Authority.authorityType}
                                disabled
                            // onChange={e => { setAuthority_Type(e.target.value) }}
                            >
                                <option value={10}>Authors</option>
                                <option value={20}>Subject headings</option>
                                <option value={30}>Publishers</option>
                                <option value={40}>Series</option>
                                <option value={50}>Sub-series</option>
                                <option value={60}>Collection Title</option>
                                <option value={70}>Uniform Titles</option>
                                <option value={80}>Class number</option>
                            </SelectBox>
                        </GridElement>

                        <GridElement s={5}>
                            <SelectBox
                                label="Link type"
                                value={Authority.linkType || 10}
                                onChange={(event) => {
                                    const Authority2 = { ...Authority }
                                    Authority2.linkType = event.target.value
                                    OnAuthorityLinkChange(index, Authority2)
                                }}
                            >
                                <option value={10}>a participé à</option>
                                <option value={20}> après, voir aussi</option>
                                <option value={30}> avant, voir aussi</option>
                                <option value={40}> est associé à</option>
                                <option value={50}> participant</option>
                                <option value={60}> voir</option>
                                <option value={70}> voir aussi</option>
                                <option value={80}> voir aussi au nom d'état-civil</option>
                                <option value={90}> voir aussi au nom dans le siècle</option>
                                <option value={110}> voir aussi au nom de femme mariée</option>
                                <option value={120}> voir aussi au nom de jeune fille</option>
                                <option value={130}> voir aussi au nom en religion</option>
                                <option value={140}> voir aussi au noms des membres du pseudonyme collectif</option>
                                <option value={150}> voir aussi au pseudoyme</option>
                                <option value={160}> voir aussi au terme générique</option>
                                <option value={170}> voir aussi au terme spécifique</option>
                                <option value={180}> voir aussi la forme développée</option>
                            </SelectBox>
                        </GridElement>
                        <GridElement s={1} style={{ lineHeight: "84px" }}>
                            <RoundButton icon="delete" size="30"
                                onClick={(e) => {
                                    OnAuthorityLinkChange(index, undefined)
                                }}
                                style={{ margin: "auto" }} />
                        </GridElement>

                    </Grid>
                </CollapsibleHeader>
                <CollapsibleBody>
                    <Grid>
                        <GridElement s={6}>
                            <DatePicker
                                label="Start"
                                value={Authority.start && Authority.start.toISOString().split("T")[0] || ""}
                                onChange={(e) => {
                                    e.persist();
                                    OnAuthorityLinkChange(index, { "start": new Date(e.target.value) })
                                }}
                            />

                        </GridElement>
                        <GridElement s={6}>
                            <DatePicker
                                label="End"
                                value={Authority.end && Authority.end.toISOString().split("T")[0] || ""}
                                onChange={(e) => {
                                    e.persist();
                                    OnAuthorityLinkChange(index, { "end": new Date(e.target.value) })
                                }}
                            />
                        </GridElement>
                    </Grid>
                    <Grid>
                        <GridElement s={12}>
                            <TextBox
                                label="Comment"
                                Multiline
                                value={Authority.comment || ""}
                                onChange={(event) => {
                                    const Authority2 = { ...Authority }
                                    Authority2.comment = event.target.value
                                    OnAuthorityLinkChange(index, Authority2)
                                }}
                            />
                        </GridElement>
                    </Grid>
                </CollapsibleBody>
            </li >
        </Collapsible >
    </div >
}
export default LinkedAuthorityView