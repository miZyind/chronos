import React, { Component } from 'react';
import styled from 'styled-components';
import * as service from '../../services';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

const nameProps = {
    title: '選擇人員',
    searchBtn: '搜尋',
    closeBtn: '取消',
    choiseBtn: '選擇'
};

type SelectWorkerProps = {
    className?: string;
    open: boolean;
    closeEvent: any;
    fetch: any;
    workerOptions: any;
    constraintId: any;
    oriSelWorkerId: number;
    oriSelWorkerName: string;
    oriSelWorkerMobile: string;
    getWorker: any;
};
class SelectWorker extends Component<SelectWorkerProps, any> {

    constructor(prop: SelectWorkerProps) {
        super(prop);
        this.state = {
            qname: '',
            qmobile: '',
            choiceWorker: this.props.oriSelWorkerId
        };
    }
    public fetchWorkers(qname: string, qmobile: string) {
        const { constraintId } = this.props;
        const obj: object = {
            'constraintId': constraintId,
            'name': qname,
            'mobile': qmobile
        };
        service.getSearchWorkers(obj)
            .then((response: any) => {
                const getData = JSON.parse(response);
                this.props.fetch({ 'type': 'workerOptions', 'data': getData });
                if (getData && getData.length > 0) {
                    this.setState({ choiceWorker: getData[0].id });
                }
            }, (error) => {
                console.log(error);
            });
    }
    public change = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    public changWorker = (e: any) => {
        this.setState({ choiceWorker: parseInt(e.currentTarget.value) });
    }
    public choice = () => {
        this.props.getWorker(this.state.choiceWorker);
        this.close();
    }
    public close = () => {
        this.setState({ qname: '', qmobile: '', choiceWorker: 0 });
        this.fetchWorkers('', '');
        this.props.closeEvent();
    }
    public render() {
        const { qname, qmobile} = this.state;
        const { className, open, oriSelWorkerName, oriSelWorkerMobile, workerOptions} = this.props;
        const { title, searchBtn, choiseBtn, closeBtn} = nameProps;
        return (
            <Modal
                className={className}
                open={open}
            >
                <Modal.Content >
                    <Modal.Description>
                        <Header>{title} <h3>原本選擇:{oriSelWorkerName}-{oriSelWorkerMobile}</h3></Header>
                        <Form>
                            <Form.Group>
                                <Form.Input placeholder='請輸入搜尋名稱' name='qname' value={qname} onChange={this.change} />
                                <Form.Input placeholder='請輸入搜尋電話' name='qmobile' value={qmobile} onChange={this.change} />
                                <Form.Button onClick={this.fetchWorkers.bind(this, qname, qmobile)}>{searchBtn}</Form.Button>
                                <Form.Field control='select' onChange={this.changWorker} placeholder='請選擇'>
                                    {Object.keys(workerOptions).map((id: any) => <option key={id} value={workerOptions[id].id} > {workerOptions[id].name}-{workerOptions[id].mobile}</option >)}
                                </Form.Field>
                            </Form.Group>
                         </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.choice}>{choiseBtn}</Button>
                    <Button color='black' onClick={this.close}>{closeBtn}</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

const StyledSelectWorker = styled(SelectWorker) `
  &&&& {
    margin-top: 0px !important;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0,0,0,0.3);
    padding: 50px;
  }
  .ui.form select{
      height: 35px;
  }
`;

export default StyledSelectWorker;
