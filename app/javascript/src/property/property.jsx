// property.jsx
import React from "react";
import Layout from "@src/layout";
import BookingWidget from "./bookingWidget";
import { handleErrors } from "../../utils/fetchHelper";

import "./property.scss";

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    currentUser: null,
  };

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });

    fetch("/api/authenticated")
      .then(handleErrors)
      .then((data) => {
        if (data.authenticated) {
          this.setState({
            currentUser: data.username,
          });
        }
      });
  }

  render() {
    const { property, loading, currentUser } = this.state;
    if (loading) {
      return <p>loading...</p>;
    }

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property;

    const isHost = currentUser && user && currentUser === user.username;

    return (
      <Layout>
        <div
          className="property-image mb-3"
          style={{ backgroundImage: `url(${image_url})` }}
        />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3 d-flex justify-content-between align-items-start">
                <div>
                  <h3 className="mb-0">{title}</h3>
                  <p className="text-uppercase mb-0 text-secondary">
                    <small>{city}</small>
                  </p>
                  <p className="mb-0">
                    <small>
                      Hosted by <b>{user.username}</b>
                    </small>
                  </p>
                </div>
                {isHost && (
                  <a
                    href={`/properties/${id}/edit`}
                    className="btn btn-outline-primary"
                  >
                    Edit Property
                  </a>
                )}
              </div>
              <div>
                <p className="mb-0 text-capitalize">
                  <b>{property_type}</b>
                </p>
                <p>
                  <span className="me-3">{max_guests} guests</span>
                  <span className="me-3">{bedrooms} bedroom</span>
                  <span className="me-3">{beds} bed</span>
                  <span className="me-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget
                property_id={id}
                price_per_night={price_per_night}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Property;
