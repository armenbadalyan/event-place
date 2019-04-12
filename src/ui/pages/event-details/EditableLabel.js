import React from "react";
import styled from "styled-components";
import { Input } from "../../components/FormInput";
import IconButton from "../../components/IconButton";

export default class EditableLabel extends React.Component {
  state = {
    editMode: false
  };

  inputRef = React.createRef();

  onEdit = () => {
    this.setState({
      editMode: true
    });
  };

  onCancel = () => {
    this.setState({
      editMode: false
    });
  };

  onSave = () => {
    this.setState({
      editMode: false
    });

    if (typeof this.props.onSave === "function") {
      this.props.onSave(this.inputRef.current.value);
    }
  };

  render() {
    const {
      value,
      component: LabelComponent,
      onSave,
      ...labelProps
    } = this.props;

    if (this.state.editMode) {
      return (
        <div>
          <div>
            <BlockInput ref={this.inputRef} defaultValue={value} />
          </div>
          <div>
            <IconButton iconName="checked" onClick={this.onSave} />
            <IconButton iconName="cancel-music" onClick={this.onCancel} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LabelComponent {...labelProps}>{value}</LabelComponent>
          <IconButton iconName="pencil-edit-button" onClick={this.onEdit} />
        </div>
      );
    }
  }
}

const BlockInput = styled(Input)`
  display: block;
  width: 100%;
`;
