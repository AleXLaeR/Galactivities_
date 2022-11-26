import {Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic} from "semantic-ui-react";

const ProfileHeader = () => (
    <Segment>
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size='small' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Header as='h1' content='Display Name' />
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
                <Statistic.Group widths={2}>
                    <Statistic label='followers' value='5' />
                    <Statistic label='following' value='10' />
                </Statistic.Group>
                <Divider />
                <Reveal animated='move' >
                    <Reveal.Content visible style={{width: '100%'}}>
                        <Button fluid color='teal' content='Following' />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width: '100%'}}>
                        <Button
                            fluid
                            basic
                            color={true ? 'red' : 'green'}
                            content={true ? 'Unfollow' : 'Follow'}
                        />
                    </Reveal.Content>
                </Reveal>
            </Grid.Column>
        </Grid>
    </Segment>
);

export default ProfileHeader;