import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";
import { generateInvoicePDF } from "../_lib/jsPdf/generateInvoice";
import ImageUploader from "./fileUpload";
import Container from "./container";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "../redux/slices/totalSlice";
import { validationSchema } from "../schema/formValidation";


function Invoice() {
    const [showDiscount, setShowDiscount] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const { total } = useSelector((state: any) => state.total)
    const dispatch = useDispatch()


    interface Item {
        description: string;
        quantity: number;
        rate: number;
    }

    function calculateDiscountedTotal(subtotal: number, discountRate: number): number {

        const discountAmount = (discountRate / 100) * subtotal

        return discountAmount;
    }


    const getSubtotal = (items: Item[]): number => {
        return items.reduce((total, item) => total + item.quantity * item.rate, 0);
    };

    const getTaxAmount = (subtotal: number, tax: number): number => {
        const taxAmount = (subtotal * tax) / 100;
        return taxAmount;
    };

    const getTotal = (subtotal: number, tax: number, discount: number, shipping: number): number => {
        return subtotal + getTaxAmount(subtotal, tax) + shipping - calculateDiscountedTotal(subtotal, discount);
    };


    const loadFromLocalStorage = () => {
        const savedData = localStorage.getItem('invoiceFormData');
        return savedData ? JSON.parse(savedData) : null;
    };


    const saveToLocalStorage = (values: any) => {
        localStorage.setItem('invoiceFormData', JSON.stringify(values));
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('invoiceFormData');
        window.location.reload()
    };


    return (
        <div className="max-w-9xl  p-4 ">
            <Container>
                <Formik
                    initialValues={loadFromLocalStorage() || {
                        total: 0,
                        subtotal: 0,
                        invoiceNumber: '',
                        invoiceDate: '',
                        dueDate: '',
                        tax: 0,
                        shipping: 0,
                        fromHead: 'Invoice From',
                        toHead: 'Invoice To',
                        from: '',
                        to: '',
                        items: [{ description: '', quantity: 1, rate: 0 }],
                        terms: '',
                        termsHead: 'Terms',
                        footnoteHead: 'Foot note',
                        footnote: '',
                        amountPaid: 0,
                        balanceDue: 0,
                        discount: 0,
                        imageUrl: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {

                        try {
                            saveToLocalStorage(values);
                            console.log('this are the  values', values);
                            const pdfArrayBuffer = await generateInvoicePDF(values);
                            const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
                            const url = window.URL.createObjectURL(pdfBlob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'invoice.pdf');


                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        } catch (error) {
                            console.error("Error generating PDF:", error);
                        }
                    }}
                >
                    {({ values, handleChange, setFieldValue }) => {

                        saveToLocalStorage(values);
                        values.subtotal = getSubtotal(values.items);
                        dispatch(setTotal(getTotal(values.subtotal, values.tax, values.discount, values.shipping)));
                        values.balanceDue = total - values.amountPaid
                        values.total = total


                        return (
                            <Form className="container mx-auto md:p-8 p-4 bg-white max-w-5xl rounded-lg md:shadow-lg md:border border-gray-300">
                                <div className="flex justify-between md:flex-row flex-col items-start mb-8">
                                    {/* Logo Section */}
                                    <ImageUploader
                                        setFieldValue={setFieldValue}
                                        imageFieldName="imageUrl"
                                        url={values.imageUrl}
                                    />

                                    {/* Invoice Details */}
                                    <div className="flex flex-col md:w-1/2 w-full space-y-4">
                                        {/* Invoice Number */}
                                        <div className="flex items-center border border-orange-300 rounded-full overflow-hidden relative">
                                            <div className="w-2/4 flex justify-between items-center bg-orange-50">
                                                <label
                                                    htmlFor="invoiceNumber"
                                                    className="px-4 w-2/3 text-left text-sm"
                                                >
                                                    Invoice
                                                </label>
                                                <div className="py-2 px-3 border-l border-r border-orange-300">#</div>
                                            </div>
                                            <Field
                                                name="invoiceNumber"
                                                className="w-full p-2 focus:outline-none text-sm"
                                                placeholder="Enter Invoice #"
                                            />
                                        </div>

                                        {/* Invoice Date */}
                                        <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                            <label
                                                htmlFor="invoiceDate"
                                                className="w-1/3 px-4 text-left text-sm"
                                            >
                                                Invoice Date
                                            </label>
                                            <Field
                                                type="date"
                                                name="invoiceDate"
                                                className="w-full p-2 focus:outline-none border-l border-orange-200 text-sm"
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </div>

                                        {/* Due Date */}
                                        <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                            <label
                                                htmlFor="dueDate"
                                                className="w-1/3 px-4 text-left text-sm"
                                            >
                                                Due Date
                                            </label>
                                            <Field
                                                type="date"
                                                name="dueDate"
                                                className="w-full p-2 focus:outline-none border-l border-orange-200 text-sm"
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Invoice From and To Section */}
                                <div className="md:grid grid-cols-2 gap-4 mb-8  flex flex-col">
                                    {/* Invoice From */}
                                    <div className="flex flex-col">

                                        <Field
                                            type="text"
                                            name="fromHead"
                                            className="border-none py-1 px-1 w-[40%] text-sm"
                                        />
                                        <Field
                                            name="from"
                                            as="textarea"
                                            className="border p-4 rounded-[15px] text-sm w-full focus:outline-none border-orange-200 focus:ring-2 focus:ring-orange-300"
                                            placeholder="Who is this invoice from?"
                                        />
                                    </div>

                                    {/* Invoice To */}
                                    <div className="flex flex-col">
                                        <Field
                                            type="text"
                                            name="toHead"
                                            className="border-none py-1 px-1 w-[40%] text-sm"
                                        />
                                        <Field
                                            name="to"
                                            as="textarea"
                                            className="border p-4 rounded-[15px] text-sm border-orange-200 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
                                            placeholder="Who is this invoice to?"
                                        />
                                    </div>
                                </div>

                                {/* Items Table */}
                                <FieldArray name="items">
                                    {({ push, remove }) => (
                                        <div className="relative">
                                            <div className="group">
                                                <table className="w-full mb-8 table-fixed border-collapse text-md">
                                                    <thead>
                                                        <tr className="border-b">
                                                            <th className="p-2 text-left md:w-[7%] text-sm">#</th>
                                                            <th className="p-2 text-left text-sm">Item</th>
                                                            <th className="p-2 text-left md:block hidden text-sm">Quantity</th>
                                                            <th className="p-2 text-left  md:hidden text-sm">Qty</th>
                                                            <th className="p-2 text-left text-sm">Rate</th>
                                                            <th className="p-2 text-left md:w-[10%] text-sm">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {values.items.map((item: any, index: any) => (
                                                            <tr
                                                                key={index}
                                                                className={`border-b-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                                                    }`}
                                                            >
                                                                <td className="p-1">
                                                                    <div className="flex items-center">
                                                                        <span>{index + 1}</span>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => remove(index)}
                                                                            className="ml-2 border border-red-600 px-1 rounded-md py-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                                        >
                                                                            <RiDeleteBin6Line />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="">
                                                                    <Field
                                                                        name={`items.${index}.description`}
                                                                        className="border border-orange-200 px-2 rounded w-full focus:outline-none text-md"
                                                                        placeholder="Item description"
                                                                    />
                                                                </td>
                                                                <td className="">
                                                                    <Field
                                                                        name={`items.${index}.quantity`}
                                                                        type="number"
                                                                        min="1"
                                                                        className="border border-orange-200 px-2 rounded w-full focus:outline-none text-md"
                                                                        placeholder="Quantity"
                                                                    />
                                                                    <ErrorMessage name={`items.${index}.quantity`} component="small" className="text-red-500" />
                                                                </td>
                                                                <td className="">
                                                                    <Field
                                                                        name={`items.${index}.rate`}
                                                                        type="number"
                                                                        min="0"
                                                                        className="border border-orange-200 px-2 rounded w-full focus:outline-none text-md"
                                                                        placeholder="Rate"
                                                                    />
                                                                    <ErrorMessage name={`items.${index}.rate`} component="small" className="text-red-500" />
                                                                </td>
                                                                <td className="px-4 text-right md:mr-0">
                                                                    ${(item.quantity * item.rate)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({ description: '', quantity: 1, rate: 0 })
                                                }
                                                className="hover:bg-red-400 bg-blue-700 text-white px-2 py-1 text-sm rounded-full mb-8"
                                            >
                                                + Add Item
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>

                                <div className="md:grid grid-cols-2 gap-8 mb-8 flex flex-col">
                                    {/* Left side for Terms and Footnote */}
                                    <div className="flex flex-col ">

                                        <Field
                                            type="text"
                                            name="termsHead"
                                            className="border-none py-1 px-1 w-[40%] text-sm"
                                        />
                                        <Field
                                            name="terms"
                                            as="textarea"
                                            className="border border-yellow-500 py-4 px-4 rounded-[15px] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                                        />

                                        <Field
                                            type="text"
                                            name="footnoteHead"
                                            className="border-none py-1 px-1 w-[40%] text-sm"
                                        />
                                        <Field
                                            name="footnote"
                                            as="textarea"
                                            className="border border-yellow-500 p-4 text-sm rounded-[15px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            placeholder="Thank you for your business"
                                        />
                                    </div>

                                    {/* Right side for Summary Section */}
                                    <div className="flex justify-end space-y-4">
                                        <div className="flex flex-col md:w-[70%] space-y-2">

                                            <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                <label
                                                    htmlFor="invoiceDate"
                                                    className="w-3/5 px-4 text-left text-sm"
                                                >
                                                    Subtotal
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="subtotal"
                                                    className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right disabled"
                                                    placeholder="Subtotal"

                                                />
                                            </div>

                                            {/* Discounts and Shipping Toggle Buttons */}
                                            <div className="flex mt-3">
                                                <button
                                                    type="button"
                                                    className={`text-red-500 flex justify-between items-center ${showDiscount ? "hidden" : 'block'}`}
                                                    onClick={() => setShowDiscount((prev) => !prev)}

                                                >
                                                    <MdOutlineAddBox className="text-gray-300 mr-1" /> Discounts
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`text-red-500  ml-2 flex justify-between items-center ${showShipping ? 'hidden' : 'block'}`}
                                                    onClick={() => setShowShipping((prev) => !prev)}
                                                >
                                                    <MdOutlineAddBox className="text-gray-300 mr-1" /> Shipping
                                                </button>
                                            </div>

                                            {/* Conditional Discount Field */}
                                            {showDiscount && (
                                                <>

                                                    <ErrorMessage name="discount" component="small" className="text-red-500" />
                                                    <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                        <label
                                                            htmlFor="discount"
                                                            className="w-3/4 px-4 text-left text-sm"
                                                        >
                                                            discount
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            name="discount"
                                                            className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right"
                                                        />
                                                        <div className="px-4 py-2 border-l border-orange-300" onClick={() => setShowDiscount(false)}>
                                                            -
                                                        </div>
                                                    </div>
                                                </>

                                            )}

                                            {/* Conditional Shipping Field */}
                                            {showShipping && (
                                                <>

                                                    <ErrorMessage name="shipping" component="small" className="text-red-500" />
                                                    <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                        <label
                                                            htmlFor="discount"
                                                            className="w-3/4 px-4 text-left text-sm"
                                                        >
                                                            shipping
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            name="shipping"
                                                            className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right"
                                                        />
                                                        <div className="px-4 py-2 border-l border-orange-300" onClick={() => setShowShipping(false)}>
                                                            -
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Taxable Value */}

                                            <ErrorMessage name="tax" component="small" className="text-red-500" />
                                            <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                <label
                                                    htmlFor="tax"
                                                    className="w-3/4 px-4 text-left text-sm"
                                                >
                                                    Taxable Value
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="tax"
                                                    className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right "

                                                />
                                                <div className="px-3 py-2 border-l border-orange-300">
                                                    %
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="flex justify-between font-semibold text-sm m-3">
                                                <span >Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>

                                            {/* Amount Paid & Balance Due */}

                                            <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                <label
                                                    htmlFor="amountPaid"
                                                    className="w-3/4 px-4 text-left text-sm"
                                                >
                                                    amountPaid
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="amountPaid"
                                                    className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right"

                                                />
                                            </div>
                                            <div className="flex items-center border border-orange-300 bg-orange-50 rounded-full overflow-hidden">
                                                <label
                                                    htmlFor="balanceDue"
                                                    className="w-3/4 px-4 text-left text-sm"
                                                >
                                                    Balance Due
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="balanceDue"
                                                    className="w-full p-2 focus:outline-none border-l border-orange-200 text-md text-right disabled"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Centered Download and Clear Buttons */}
                                <div className="flex justify-center mt-8 space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
                                    >
                                        Download PDF
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                                        onClick={clearLocalStorage}
                                    >
                                        Clear
                                    </button>
                                </div>

                            </Form>
                        );
                    }}

                </Formik>
            </Container>
        </div>
    );
}

export default Invoice;
