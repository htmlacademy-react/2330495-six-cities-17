import React, { useState } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postComment } from '../../store/api-actions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';

const initialState = { rating: '', review: '' };

type FormCommentsProps = {
  offerId: string;
};

function FormComments({ offerId }: FormCommentsProps): JSX.Element {
  const [formData, setFormData] = useState(initialState);
  const isSubmitDisabled = !formData.rating || formData.review.length < 50;

  const authorizationStatus = useAuthorizationStatus();
  const dispatch = useAppDispatch();

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      toast.error('You need to be logged in to submit a review.');
      return;
    }

    dispatch(
      postComment({
        offerId,
        comment: formData.review,
        rating: Number(formData.rating),
      })
    )
      .then(() => {
        setFormData(initialState);
      })
      .catch(() => {
        toast.error('Failed to submit review. Please try again later.');
      });
  };

  return (
    <>
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((value) => (
            <React.Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${value}-stars`}
                type="radio"
                value={value.toString()}
                onChange={handleFieldChange}
                checked={formData.rating === value.toString()}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={
                  ['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]
                }
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>
        <textarea
          onChange={handleFieldChange}
          value={formData.review}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default FormComments;
