module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      @booking = user.bookings.create!(property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date])
      render 'api/bookings/create', status: :created
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      @bookings = property.bookings.where('end_date > ? ', Date.today)
      render 'api/bookings/index'
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end
