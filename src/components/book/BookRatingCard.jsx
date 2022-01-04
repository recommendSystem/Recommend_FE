import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function BookRatingCard({ title, rating, numReviews }) {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 400 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Rating
            max={10}
            value={rating}
            precision={0.1}
            readOnly
            sx={{ ml: -0.5 }}
          />
          <Typography variant="body1" color="text.secondary">
            Ratings : {rating}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Reviews : {numReviews}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
