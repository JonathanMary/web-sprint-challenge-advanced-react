import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const sanityCheck = render(<CheckoutForm />);
    const header = sanityCheck.getByText("Checkout Form");
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    //ARRANGE
    const wrapper = render(<CheckoutForm />);

    //ACT
    //get the different inputs of the form
    const firstName = wrapper.getByLabelText(/first name/i);
    const lastName = wrapper.getByLabelText(/last name/i);
    const address = wrapper.getByLabelText(/address/i);
    const city = wrapper.getByLabelText(/city/i);
    const state = wrapper.getByLabelText(/state/i);
    const zip = wrapper.getByLabelText(/zip/i);

    const checkoutButton = wrapper.getByRole("button", { name: /checkout/i });

    //fill the inputs
    userEvent.type(firstName, "Daniel");
    userEvent.type(lastName, "Plainview");
    userEvent.type(address, "Main Street");
    userEvent.type(city, "Fond du Lac");
    userEvent.type(state, "Wisconsin");
    userEvent.type(zip, "54936");

    //press the checkout button
    userEvent.click(checkoutButton);

    //ASSERT
    //does form show success message?
    const successMessage1 = wrapper.getByText(/You have ordered some plants! Woo-hoo!/i);
    expect(successMessage1).toBeInTheDocument();
    expect(successMessage1).toBeVisible();
    const successMessage2 = wrapper.getByText(/Your new green friends will be shipped to:/i);
    expect(successMessage2).toBeInTheDocument();
    expect(successMessage2).toBeVisible();
    const fullName = wrapper.getByText(/Daniel Plainview/i);
    expect(fullName).toBeInTheDocument();
    expect(fullName).toBeVisible();
    const checkAddress = wrapper.getByText(/Main Street/i);
    expect(checkAddress).toBeInTheDocument();
    expect(checkAddress).toBeVisible();
    const place = wrapper.getByText(/Fond du Lac, Wisconsin 54936/i);
    expect(place).toBeInTheDocument();
    expect(place).toBeVisible();

});
