import numpy
# scipy.special for the sigmoid function expit()
import scipy.special
import scipy.ndimage
# library for plotting arrays
import matplotlib.pyplot
import csv
import time

class neuralNetwork:
    
    
    # initialise the neural network
	def __init__(self, inputnodes, hiddennodes, outputnodes, learningrate):
        # set number of nodes in each input, hidden, output layer
		self.inodes = inputnodes+1
		self.hnodes = hiddennodes
		self.onodes = output_nodes

        # link weight matrices, wih and who
        # weights inside the arrays are w_i_j, where link is from node i to node j in the next layer
        # w11 w21
        # w12 w22 etc 
		self.wih = numpy.random.normal(0.0, pow(self.hnodes, -0.5), (self.hnodes, self.inodes))
		self.who = numpy.random.normal(0.0, pow(self.onodes, -0.5), (self.onodes, self.hnodes))

        # learning rate
		self.lr = learningrate
        
        # activation function is the sigmoid function
		self.activation_function = lambda x: scipy.special.expit(x)
        
		pass

    
    # train the neural network
	def train(self, inputs_list, targets_list):
        # convert inputs list to 2d array
		inputs_list=numpy.insert(inputs_list,0,1.0,axis=0)
		inputs = numpy.array(inputs_list, ndmin=2).T
		#print(inputs.shape)
		targets = numpy.array(targets_list, ndmin=2).T
        
        # calculate signals into hidden layer
		hidden_inputs = numpy.dot(self.wih, inputs)
        # calculate the signals emerging from hidden layer
		hidden_outputs = self.activation_function(hidden_inputs)
		#hidden_outputs=numpy.insert(hidden_outputs,0,1.0,axis=0)
		#print((hidden_outputs).shape)

        # calculate signals into final output layer
		final_inputs = numpy.dot(self.who, hidden_outputs)
        # calculate the signals emerging from final output layer
		final_outputs = self.activation_function(final_inputs)

        # output layer error is the (target - actual)
		output_errors = targets - final_outputs
        # hidden layer error is the output_errors, split by weights, recombined at hidden nodes
		hidden_errors = numpy.dot(self.who.T, output_errors) 
        
        # update the weights for the links between the hidden and output layers
		self.who += self.lr * numpy.dot((output_errors * final_outputs * (1.0 - final_outputs)), numpy.transpose(hidden_outputs))
        
        # update the weights for the links between the input and hidden layers
		self.wih += self.lr * numpy.dot((hidden_errors * hidden_outputs * (1.0 - hidden_outputs)), numpy.transpose(inputs))
        
		pass

    
    # query the neural network
	def query(self, inputs_list):
		# convert inputs list to 2d array
		inputs_list=numpy.insert(inputs_list,0,1.0)
		inputs = numpy.array(inputs_list, ndmin=2).T
        
        # calculate signals into hidden layer
		hidden_inputs = numpy.dot(self.wih, inputs)
        # calculate the signals emerging from hidden layer
		hidden_outputs = self.activation_function(hidden_inputs)
		#hidden_outputs=numpy.insert(hidden_outputs,0,1.0,axis=0)

        # calculate signals into final output layer
		final_inputs = numpy.dot(self.who, hidden_outputs)
		# calculate the signals emerging from final output layer
		final_outputs = self.activation_function(final_inputs)
        
		return final_outputs


start = time.time()

# number of input, hidden and output nodes
input_nodes = 784
hidden_nodes = 200
output_nodes = 10

# learning rate
learning_rate = 0.1

# create instance of neural network
n = neuralNetwork(input_nodes,hidden_nodes,output_nodes, learning_rate)


# load the mnist training data CSV file into a list
training_data_file = open("mnist_train.csv", 'r')
training_data_list = training_data_file.readlines()
training_data_file.close()


# train the neural network

# epochs is the number of times the training data set is used for training
epochs = 10

for e in range(epochs):
	print(e,'/',epochs)
    # go through all records in the training data set
	for record in training_data_list:
        # split the record by the ',' commas
		all_values = record.split(',')
        # scale and shift the inputs
		inputs = (numpy.asfarray(all_values[1:]) / 255.0 * 0.99) + 0.01
        # create the target output values (all 0.01, except the desired label which is 0.99)
		targets = numpy.zeros(output_nodes) + 0.01
        # all_values[0] is the target label for this record
		targets[int(all_values[0])] = 0.99
		n.train(inputs, targets)
        
        ## create rotated variations
        # rotated anticlockwise by x degrees
		inputs_plusx_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28,28), 10, cval=0.01, order=1, reshape=False)
		n.train(inputs_plusx_img.reshape(784), targets)
        # rotated clockwise by x degrees
		inputs_minusx_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28,28), -10, cval=0.01, order=1, reshape=False)
		n.train(inputs_minusx_img.reshape(784), targets)
        
        # rotated anticlockwise by 10 degrees
        #inputs_plus10_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28,28), 10, cval=0.01, order=1, reshape=False)
        #n.train(inputs_plus10_img.reshape(784), targets)
        # rotated clockwise by 10 degrees
        #inputs_minus10_img = scipy.ndimage.interpolation.rotate(inputs.reshape(28,28), -10, cval=0.01, order=1, reshape=False)
        #n.train(inputs_minus10_img.reshape(784), targets)
        
		pass
	pass

end = time.time()

#test=open("mnist1.csv", 'r')
#test_data = test.readlines()
#test.close()

# wih2 = open("wih2.csv", 'r')
# wih2 = wih2.readlines()
# wih2=wih2[0].split(',')
# wih2=numpy.asfarray(wih2)
# wih2=wih2.reshape(200,784)
# who2 = open("who2.csv", 'r')
# who2 = who2.readlines()
# who2=who2[0].split(',')
# who2=numpy.asfarray(who2)
# who2=who2.reshape(10,200)

#n.wih=wih2
#n.who=who2

test_data_file = open("mnist_test.csv", 'r')
test_data_list = test_data_file.readlines()
test_data_file.close()

scorecard = []

for record in test_data_list:
    # split the record by the ',' commas
    all_values = record.split(',')
    # correct answer is first value
    correct_label = int(all_values[0])
    # scale and shift the inputs
    inputs = (numpy.asfarray(all_values[1:]) / 255.0 * 0.99) + 0.01
    # query the network
    outputs = n.query(inputs)
    # the index of the highest value corresponds to the label
    label = numpy.argmax(outputs)
    # append correct or incorrect to list
    if (label == correct_label):
        # network's answer matches correct answer, add 1 to scorecard
        scorecard.append(1)
    else:
        # network's answer doesn't match correct answer, add 0 to scorecard
        scorecard.append(0)
        pass
    
    pass


# calculate the performance score, the fraction of correct answers
scorecard_array = numpy.asarray(scorecard)
print ("performance = ", scorecard_array.sum() / scorecard_array.size)


print((end-start)/60)

# fl='wih2.csv'
# ofile=open(fl,'w')
# writer=csv.writer(ofile,delimiter=',')
# writer.writerow(n.wih.reshape(1,200*784)[0])
# ofile.close()

# fl='who2.csv'
# ofile=open(fl,'w')
# writer=csv.writer(ofile,delimiter=',')
# writer.writerow(n.who.reshape(1,2000)[0])
# ofile.close()
