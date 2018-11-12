class TagsController < ApplicationController
  before_action :set_tag, only: [:edit, :update, :destroy]

  def index
    policy_scope(Tag)
    tags = Tag.all.order(:name)
    authorize tags
    gon.tags = tags
  end

  def new
    @tag = Tag.new
    authorize @tag
  end

  def create
    @tag = Tag.new(tag_params)
    authorize @tag
    @tag.save
    respond_to do |format|
      format.json { render json: { tag: @tag }, status: 200 }
      format.html { redirect_to tags_path }
    end
  end

  def edit; end

  def update
    @tag.update(tag_params)
    if @tag.save
      redirect_to tags_path
    else
      render 'edit'
    end
  end

  def destroy
    @tag.destroy
    head :ok
  end

  private

  def set_tag
    @tag = Tag.find(params[:id])
    authorize @tag
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
