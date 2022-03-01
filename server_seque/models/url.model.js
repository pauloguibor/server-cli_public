module.exports = (sequelize, DataTypes) => {
    const Url = sequelize.define("users_urls", {
        url: 
        {type:DataTypes.STRING},
        user_id: 
        {type:DataTypes.INTEGER},
        new_url:
        {type:DataTypes.STRING},
        hits: 
        {type:DataTypes.INTEGER}
    })
    
    return Url;
}
