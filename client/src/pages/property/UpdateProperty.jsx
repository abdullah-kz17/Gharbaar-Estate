// src/pages/EditPropertyPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProperty, updateProperty } from '../../store/thunks/PropertyThunk.js';
import { toast } from 'react-toastify';
import UpdatePropertyForm from "../../components/listings/UpdatePropertyForm.jsx";

const UpdateProperty = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { property, loading } = useSelector((state) => state.property);

    useEffect(() => {
        dispatch(getSingleProperty(id));
    }, [dispatch, id]);

    const handleUpdate = (formData) => {
        const dataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            // For nested objects, JSON.stringify them
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                dataToSend.append(key, JSON.stringify(value));
            } else {
                dataToSend.append(key, value);
            }
        });

        dispatch(updateProperty({ id, formData: dataToSend }))
            .unwrap()
            .then(() => {
                toast.success('Property updated successfully');
                navigate('/properties');
            })
            .catch((err) => {
                toast.error(err || 'Failed to update');
            });
    };


    return (
        <div>
            {loading || !property ? (
                <p className="text-center py-10 text-gray-500">Loading property data...</p>
            ) : (
                <UpdatePropertyForm
                    onSubmit={handleUpdate}
                    defaultValues={{
                        ...property,
                        features: property.features?.join(', '),
                        amenities: property.amenities?.join(', ')
                    }}
                />
            )}
        </div>
    );
};

export default UpdateProperty;
