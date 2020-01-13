import * as React from 'react';
import { Form, Checkbox, Container, Radio } from 'semantic-ui-react'

export interface Props {
}

export interface State {
    enabled: boolean
    delay: number
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            enabled: false,
            delay: 0,
        }

        chrome.storage.local.get('enabled', (value: State) => {
            const enabled = value.enabled == undefined? this.state.enabled : Boolean(value.enabled)
            this.setState({enabled})
        })

        chrome.storage.local.get('delay', (value: State) => {
            const delay = value.delay == undefined? this.state.delay : value.delay
            this.setState({delay})
        })

    }

    toggleEnabled(event, { checked }) {
        chrome.storage.local.set({enabled: checked}, () => {
            this.setState({enabled: checked})
        })
    }

    handleChange(e, { value }) {
        chrome.storage.local.set({delay: value}, () => {
            this.setState({delay: value})
        })
    }

    render(): JSX.Element {
        return (
            <Container>
                <Form style={{padding: 20}}>
                    <Form.Field>
                        <label>ボイスの自動再生</label>
                        <Checkbox toggle checked={this.state.enabled} onChange={this.toggleEnabled.bind(this)} />
                    </Form.Field>
                    
                    <label>再生間隔</label>
                    {[0, 500, 1000].map((item) => {
                        return <Form.Field key={item}><Radio label={`${item}ms`} name='delay' value={item} checked={this.state.delay === item} onChange={this.handleChange.bind(this)} /></Form.Field>
                    })}
                    
                </Form>
            </Container>

        )
    }
}
