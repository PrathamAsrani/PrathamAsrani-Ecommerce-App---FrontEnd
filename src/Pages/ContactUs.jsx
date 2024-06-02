import React from "react";
import Layout from "../Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const ContactUs = () => {
  return (
    <Layout>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any queries or information about our products, feel free to call us anytime. We are available 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : <a href="mailto:prathamasrani.cs@gmail.com">prathamasrani.cs@gmail.com</a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : <a href="tel:9145495032">+91 9145495032</a>
          </p>
          <p className="mt-3">
            <BiSupport /> : <a href="tel:9145495032">Have an Idea Call me</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
