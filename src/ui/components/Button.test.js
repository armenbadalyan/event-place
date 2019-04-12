import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  test("Button component renders correctly", () => {
    const tree = renderer.create(<Button label="My Button" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Button component renders a label", () => {
    const wrapper = shallow(<Button label="My Label" />);

    expect(wrapper.text()).toBe("My Label");
  });

  test("Button component calls onClick prop", () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button label="My Label" onClick={onClick} />);

    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
