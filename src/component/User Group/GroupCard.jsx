import { Button } from '@mui/material';
import React from 'react';
// import * as React from 'react';
// import { makeStyles } from '@mui/styles';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import CardActionArea from '@mui/material/CardActionArea';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 345,
//     },
//     content: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//   }));



const GroupCard = ({ group }) => {

    // const classes = useStyles();


  return (


    <div className="card" style={{ width: '20rem', height: '13rem' }}>
      <div className="card-body">
        <h4 className="card-title mb-1" style={{ fontWeight: 500 }}>
          {group.name}
        </h4>
        <p className="card-text">{group.description}</p>

        <Button variant="contained">Add</Button>
      </div>
    </div>

    // MUI code
    // <Card className={classes.root}>
    //   <CardActionArea >
    //     <CardHeader title={group.name} />
    //     <CardContent className={classes.content}>
    //       <Typography variant="body2" color="text.secondary">
    //         {group.description}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //         Created by: {}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <Button size="small" color="primary" >
    //     Group Details
    //   </Button>
    // </Card>



  );
};

export default GroupCard;
