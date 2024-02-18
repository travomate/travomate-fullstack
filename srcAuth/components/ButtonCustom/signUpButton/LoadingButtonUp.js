import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator  } from 'react-native'
import React from 'react'

const LoadingButtonUp = ({onPress, text, type,submitting = false}) => {
    let buttonStyles, textStyles;
    if(type === 'PRIMARY') {
      buttonStyles = styles.container_PRIMARY;
      textStyles = styles.textPrimary;
    }
     else if(type === 'SECONDARY'){
      buttonStyles = styles.container_SECONDARY;
      textStyles = styles.textSECONDARY;
    }
     else if(type === 'TERTIARY'){
      buttonStyles = styles.container_TERTIARY;
      textStyles = styles.text_TERTIARY
    }
    else{
      buttonStyles = styles.container;
      textStyles = styles.text;
      
    }
    
    return (
        <TouchableOpacity
          onPress={!submitting ? onPress : null}
          style={buttonStyles}
          disabled={submitting} // Disable the button while submitting
        >
          {submitting  && type !== 'TERTIARY' ?(
            <ActivityIndicator size="small" color={type === 'PRIMARY' ? 'white' : '#4287f5'} />
          ) : (
            <>
              {type === 'TERTIARY' && (
                <View>
                  <Text style={textStyles}>{text}</Text>
                </View>
              )}
              {type === 'SECONDARY' &&
                <Text style={textStyles}>{text}</Text>
              }
              {type === 'PRIMARY' &&
                <Text style={textStyles}>{text}</Text>
              }
            </>
            )}
    </TouchableOpacity>
  );
  }
  
  const styles = StyleSheet.create({
      container:{
        width: '100%',
        height: 48,
        backgroundColor: '#4287f5',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:3,
      },
      container_PRIMARY:{
        width: '100%',
        height: 48,
        backgroundColor: '#4287f5',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:3,
        
      },
      container_SECONDARY:{
        width: '100%',
        height: 48,
        borderColor:'#4287f5',
        borderRadius: 8,
        borderWidth:2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5,
      },
      container_TERTIARY:{
        marginTop: 12,
        marginBottom:3,
        
      },
      textPrimary:{
          fontWeight:'bold',
          color:'white',
      },
      textSECONDARY:{
          color:'#4287f5',
      },
      text: {
       fontWeight:'bold',
       color:'red',
      },
      text_TERTIARY:{
          color:'gray',
      },
      loadingIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 8,
      },
  });

export default LoadingButtonUp
